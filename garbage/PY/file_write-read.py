from flask import Flask
import csv

app = Flask(__name__)
@app.route("/")
def hello_www():
    return "Sveika pasaule! </br> Spēletāji gandrīz ir! </br> Statistika drīz būs!"

# rakstam /ja ir "a" - tad append, ja "w" - tad rewrite
def csv_writer1(data, path):
    with open(path, "a", newline='') as csv_file:
        writer = csv.writer(csv_file, delimiter=';')
        for line in data:
            writer.writerow(line)

if __name__ == "__main__":
    data = [['username','parole', ],
            ['user1', 'aaaaa', ],
            ['user2', 'bbbb', ],
            ['user3', 'cccc', ]]

    path = "file_useri.csv"
    csv_writer1(data, path)


def csv_writer2(data, path):
    with open(path, "a", newline='') as csv_file:
        writer = csv.writer(csv_file, delimiter=';')
        for line in data:
            writer.writerow(line)

if __name__ == "__main__":
    data = [['username','results', 'datums', 'laiks' ],
            ['user1', '3', '2019-11-01', '00:01'],
            ['user2', '3', '2019-11-02', '00:03' ],
            ['user3', '3', '2019-11-03', '00:05' ]]

    path = "file_statistika.csv"
    csv_writer2(data, path)

# Lasisana 

filepath = r"file_statistika.csv"
arr1 = []
arr2 = []

with open(filepath, "r", newline="") as file:
    reader = csv.reader(file)
    for row in reader:
        cur_arr = row[0].split(';')
        arr1.extend(cur_arr)
        arr2.extend([cur_arr])
    print(arr1)
    print(arr2)

app.run(host='0.0.0.0', port=8020)

