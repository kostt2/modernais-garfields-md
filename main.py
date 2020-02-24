from flask import Flask, render_template, redirect, url_for, request, json, jsonify, make_response
from operator import itemgetter
app = Flask(__name__)
import csv


@app.route('/')
def root():
    return render_template('index.html')

# parbaude loginam - vai eksiste user
@app.route('/yn', methods=['POST'])
def login():
   login = False
   j=json.loads(request.data)
   with open('unames.csv', 'r', encoding='UTF-8') as csvfile:
      csv_reader = csv.reader(csvfile, delimiter = ';')
      username = j['uname']
      password = j['pwd']
      for row in csv_reader:
         if row[0]==username and row[1]==password:
            login = True
            break
   if login == True:
        myresp = 'JAA'
   else:
        myresp = 'NEE'
   return (myresp)

#logina parbaude   
@app.route('/lgnchk', methods=['POST'])
def lgnchk():
   lgnchk = True
   j=json.loads(request.data)
   with open('unames.csv', 'r', encoding='UTF-8') as csvfile:
      csv_reader = csv.reader(csvfile, delimiter = ';')
      chkusername = j['runame']
      for row in csv_reader:
         if row[0]==chkusername:
            lgnchk = False
            break
   if lgnchk == False:
        myresp = 'SAKRIIT'
   else:
        myresp = 'NESAKRIIT'
   return (myresp)

# registracija   
@app.route('/rgstr', methods=['POST'])
def rgstr():
   rgstr = False
   j=json.loads(request.data)
   addname = j['reguname']
   addpwd = j['regpwd']
   with open('unames.csv', 'a', newline="", encoding='UTF-8') as csvfile:
     csv_writer = csv.writer(csvfile, delimiter=';')
     adduser = [addname, addpwd]
     csv_writer.writerow(adduser)
     csvfile.close()
     
     with open('unames.csv', 'r', encoding='UTF-8') as csvfile:
       csv_reader = csv.reader(csvfile, delimiter = ';')
       for row in csv_reader:
          if row[0]==addname and row[1]==addpwd:
            rgstr = True
            break

   if rgstr == True:
        myresp = 'IZDEVAS'
   else:
        myresp = 'NEIZDEVAS'
   return (myresp)

#statistikas izveide   
@app.route('/sttstk', methods=['POST'])
def sttstk():
   sttstk = False
   j=json.loads(request.data)
   addsuname = j['suname']
   addjautno = j['jautno']
   addstatok = j['statok']   
   adddatumslaiks = j['datumslaiks']   
   addsplslks = j['splslks']   
   addrsltts = j['rsltts']
   
   with open('statistika.csv', 'a', newline="", encoding='UTF-8') as csvfile:
     csv_writer = csv.writer(csvfile, delimiter=',')
     addstt = [ addsuname, addjautno, addstatok, adddatumslaiks, addsplslks, addrsltts]
     csv_writer.writerow(addstt)
     csvfile.close()
     
     with open('statistika.csv', 'r', encoding='UTF-8') as csvfile:
       csv_reader = csv.reader(csvfile, delimiter = ',')
       for row in csv_reader:
          if row[0]==addsuname and row[3]==adddatumslaiks:
            sttstk = True
            break

   if sttstk == True:
        myresp = 'STATOK'
   else:
        myresp = 'NEIZDEVAS'
   return (myresp)
   
# myTop10
@app.route('/mytop', methods=['POST'])
def mytop():
   data=request.json
   mtuname=data["uname"]
   print(mtuname)
   f = open('statistika.csv', 'r', newline="", encoding='UTF-8')
   reader = csv.DictReader( f, fieldnames = ( "0.","1.","2.","3.","4.","5."))
   out = json.dumps( [obj for obj in reader if(obj['0.'] == mtuname)], indent=2)
   f.close()
   saraksts=json.loads(out)
   ssaraksts=sorted(saraksts, key=lambda i: (i['5.'], i['3.']), reverse=True) 
   print (ssaraksts)
   response = {
            'mytopten': ssaraksts
   }
   print(response)
   return json.dumps(response, indent=2)

# Top10
@app.route('/alltop', methods=['POST'])
def alltop():
   data=request.json
   mtuname=data["uname"]
   print(mtuname)
   f = open('statistika.csv', 'r', newline="", encoding='UTF-8')
   reader = csv.DictReader( f, fieldnames = ( "1.","2.","3.","4.","5.","6."))
   out = json.dumps( [obj for obj in reader ], indent=2)
   f.close()
   saraksts=json.loads(out)
   ssaraksts=sorted(saraksts, key=lambda i: (i['6.'], i['4.']), reverse=True) 
   print (ssaraksts)
   response = {
            'alltopten': ssaraksts
   }
   print(response)
   return json.dumps(response, indent=2)

@app.route('/chats/lasi')
def ielasit_chatu():
  chata_rindas=[]
  with open("chats.txt","r",encoding="UTF-8") as f:
     for rinda in f:
       chata_rindas.append(rinda)
  return jsonify({"chats":chata_rindas})

@app.route('/chats/suuti',methods=['POST'])
def suuti_zinju():
  print('sanemu datus')
  dati=request.json
  print(dati)
  with open("chats.txt", "a", newline="") as f:
    f.write(dati["chats"] + "\n")
  return ielasit_chatu()


if __name__ == '__main__':
    app.run(threaded=True, port=5000, debug=True)