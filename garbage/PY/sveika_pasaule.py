from flask import Flask
import csv

app = Flask(__name__)
@app.route("/")
def hello_www():
    return "Sveika pasaule!"

#app.run(host='0.0.0.0', port=8020) 
# pedeja rinda vajag Repl.It(am)