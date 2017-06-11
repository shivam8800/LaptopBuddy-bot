from flask import Flask, request

from pymongo import MongoClient
from bson.json_util import dumps
from flask.ext.cors import CORS, cross_origin

import string

app =Flask(__name__)


client = MongoClient()
db = client.laptop_selling_api

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


app.config.update({
    "DEBUG": True
})


# YHA HUM USER SE RANGE MANG RHE HAI AUR USS RANGE K HISAB SE HUM DATA FILTER K RETURN KARWA RHE HAI
@app.route('/laptop_sale/price_range_laptops/<int:lessthan>', methods=['GET'])
def getting_laptop_names(lessthan):
    all_laptops =list(db.LaptopDetails.find({"prize": {"$lt": lessthan}}))
    print all_laptops
    laptopname =[laptopname for laptopname in all_laptops if {"prize": {"$lt": lessthan}}]

    namelist =[]
    for i in range(len(laptopname)):
        namelist.append({"Name": laptopname[i]['Name'], "prize": laptopname[i]['prize']})

    response = app.response_class(
        response=dumps(namelist),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route('/laptop_sale/laptop_details/<string:name>', methods=['GET'])
def getting_one_laptop_details(name):
    underscoreReplace= string.replace(name, "_", " ")
    all_laptops =list(db.LaptopDetails.find())
    one_laptop =[one_laptop for one_laptop in all_laptops if underscoreReplace == one_laptop['Name']]
    response = app.response_class(
        response=dumps(one_laptop),
        status=200,
        mimetype='application/json'
    )
    return response


if __name__ =="__main__":
    app.run()