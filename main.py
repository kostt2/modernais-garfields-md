from flask import Flask, render_template, redirect, url_for, request, json, jsonify, make_response
app = Flask(__name__)
import csv

@app.route('/')
def root():
    return render_template('index.html')

# parbaude loginam - vai eksiste user
@app.route('/yn', methods=['POST'])
def login():
#   print('izsaukums atnaca dati')
   login = False
   j=json.loads(request.data)
#   print(j['uname'])
#   print(j['pwd'])
   with open('unames.csv', 'r', encoding='UTF-8') as csvfile:
      csv_reader = csv.reader(csvfile, delimiter = ';')
      username = j['uname']
      password = j['pwd']
#      print(username, password)
      
      for row in csv_reader:
#         print(row)
#         print(row[0], row[1])
#         print(username, password)
         if row[0]==username and row[1]==password:
            login = True
            print ("Izdevas")
            break

   if login == True:
#        print ("Izdevas__")
        myresp = 'JAA'
   else:
#        print ("Neizdevas__")
        myresp = 'NEE'
   return (myresp)

#logina parbaude   
@app.route('/lgnchk', methods=['POST'])
def lgnchk():
#   print('izsaukums atnaca dati')
   lgnchk = True
   j=json.loads(request.data)
#   print(j['runame'])
   with open('unames.csv', 'r', encoding='UTF-8') as csvfile:
      csv_reader = csv.reader(csvfile, delimiter = ';')
      chkusername = j['runame']
#      print(chkusername)
      
      for row in csv_reader:
#         print(row)
#         print(row[0])
#         print(chkusername)
         if row[0]==chkusername:
            lgnchk = False
#            print ("Logini sakrīt")
            break

   if lgnchk == False:
#        print ("SAKRIIT")
        myresp = 'SAKRIIT'
   else:
#        print ("NESAKRIIT")
        myresp = 'NESAKRIIT'
   return (myresp)

# registracija   
@app.route('/rgstr', methods=['POST'])
def rgstr():
#   print('izsaukums atnaca dati')
   rgstr = False
   j=json.loads(request.data)
#   print(j['reguname'])
#   print(j['regpwd'])   
   addname = j['reguname']
   addpwd = j['regpwd']

   with open('unames.csv', 'a', newline="", encoding='UTF-8') as csvfile:
     csv_writer = csv.writer(csvfile, delimiter=';')
     adduser = [addname, addpwd]
#     writer = csv.writer(csvfile)
     csv_writer.writerow(adduser)
     csvfile.close()
     
     with open('unames.csv', 'r', encoding='UTF-8') as csvfile:
       csv_reader = csv.reader(csvfile, delimiter = ';')
       for row in csv_reader:
#          print(row)
#         print(row[0], row[1])
#         print(username, password)
          if row[0]==addname and row[1]==addpwd:
            rgstr = True
#            print ("Izdevas")
            break

   if rgstr == True:
#        print ("Izdevas__")
        myresp = 'IZDEVAS'
   else:
#        print ("Neizdevas__")
        myresp = 'NEIZDEVAS'
   return (myresp)

#statistikas izveide   
@app.route('/sttstk', methods=['POST'])
def sttstk():
#   print('izsaukums atnaca dati')
   sttstk = False
   j=json.loads(request.data)
#   print(j['suname'])
#   print(j['jautno'])   
#   print(j['statok'])   
#   print(j['datumslaiks'])   
#   print(j['splslks'])   
#   print(j['rsltts'])   
   addsuname = j['suname']
   addjautno = j['jautno']
   addstatok = j['statok']   
   adddatumslaiks = j['datumslaiks']   
   addsplslks = j['splslks']   
   addrsltts = j['rsltts']
   
   with open('statistika.csv', 'a', newline="", encoding='UTF-8') as csvfile:
     csv_writer = csv.writer(csvfile, delimiter=';')
     addstt = [ addsuname, addjautno, addstatok, adddatumslaiks, addsplslks, addrsltts]
     csv_writer.writerow(addstt)
     csvfile.close()
     
     with open('statistika.csv', 'r', encoding='UTF-8') as csvfile:
       csv_reader = csv.reader(csvfile, delimiter = ';')
       for row in csv_reader:
#          print(row)
#         print(row[0], row[1])
#         print(username, password)
          if row[0]==addsuname and row[3]==adddatumslaiks:
            sttstk = True
#            print ("Izdevas")
            break

   if sttstk == True:
#        print ("Izdevas__")
        myresp = 'STATOK'
   else:
#        print ("Neizdevas__")
        myresp = 'NEIZDEVAS'
   return (myresp)
   
# atlase 
@app.route('/qry', methods=['POST'])
def qry():
#   print('izsaukums atnaca dati')
   qry = False
   j=json.loads(request.data)
#   print(j['uname'])

   with open('statistika.csv', 'r', encoding='UTF-8') as csvfile:
      csv_reader = csv.reader(csvfile, delimiter = ';')
      qryx = j['uname']
#      print(qryx)
      
      for row in csv_reader:
         if qryx in row[0]:
#            print(row)
            qry = True
# ierakstam izveletos datus datne
            with open('qryx.csv', 'a', newline="", encoding='UTF-8') as csvfile:
                csv_writer = csv.writer(csvfile, delimiter=';')
                addqry = [row]
                csv_writer.writerows(addqry)
                csvfile.close()   
            
   if qry == True:
#        print ("Izdevas__")
        myresp = 'STATOK'
   else:
#        print ("Neizdevas__")
        myresp = 'NEIZDEVAS'
   return (myresp)


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
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000, debug=True)