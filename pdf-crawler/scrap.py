import PyPDF2
import os
import wget
import shutil
from urllib.parse import urlparse

def getLinks(file):
    urls = []
    PDFFile = open(file,'rb')
    try:
        PDF = PyPDF2.PdfFileReader(PDFFile)
        pages = PDF.getNumPages()
        key = '/Annots'
        uri = '/URI'
        ank = '/A'
        for page in range(pages):
            pageSliced = PDF.getPage(page)
            pageObject = pageSliced.getObject()
            if key in pageObject.keys():
                ann = pageObject[key]
                for a in ann:
                    u = a.getObject()
                    try:
                        if uri in u[ank].keys() and u[ank][uri].find("pdf") > 0:
                            urls.append(u[ank][uri])
                    except:
                        pass
    except:
        pass
    return urls

allurls = set()
while True:
    urls = set()
    files = [f for f in os.listdir('./out') if os.path.isfile(os.path.join('./out', f)) and f.endswith(".pdf")]
    print("Count ", len(files))
    for f in files:
        print("File ", f)
        urls |= set(getLinks('./out/' + f))
        shutil.move(os.path.join('./out', f), "./in/")
    for i in urls:
        if i not in allurls:
            print(i)
            try:
                wget.download(i, './out/' + os.path.basename(urlparse(i).path))
            except:
                pass
    print("Count ", len(urls))
    allurls |= urls


