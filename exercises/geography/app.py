import requests
from flask import Flask, request, render_template, send_from_directory
from flask import redirect, url_for
import records


THE_COUNTRIES = []
THE_REGIONS = []
THE_CONTINENTS = []

countryCACHE = {}
continentCACHE = {}
regionCACHE = {}

app = Flask(__name__)

def get_data_from_db(host: str, port: int, user: str, dbname: str, query: str) -> list:
    db = records.Database(f"postgres://{user}:@{host}:{port}/{dbname}")
    rows = db.query(query)
    return rows

@app.route("/", methods=["GET", "POST"])
def index():
    global countryCACHE
    global continentCACHE
    global regionCACHE
    
    if request.method == "GET":
        return render_template("base.html")
       
    if request.form.get("country"):
        country = request.form.get("country")
        if country in countryCACHE:
            result = countryCACHE[country]
        else:
            result = get_data_from_db(
                host="localhost",
                port=2345,
                user="maxqu01",
                dbname="world",
                query=f"select * from country join city on city.id = country.capital where code = '{country}';",
            )
            countryCACHE[country] = result
        return render_template("result.html", rows=result, title=country)

    elif request.form.get("continent"):
        continent = request.form.get("continent")
        if continent in continentCACHE:
            result = continentCACHE[continent]
        else:
            result = get_data_from_db(
                host="localhost",
                port=2345,
                user="maxqu01",
                dbname="world",
                query=f"select * from country join city on city.id = country.capital where continent = '{continent}';",
            )
            continentCACHE[continent] = result
        return render_template("result.html", rows=result, title=continent)

    elif request.form.get("region"):
        region = request.form.get("region")
        if region in regionCACHE:
            result = regionCACHE[region]
        else:
            result = get_data_from_db(
                host="localhost",
                port=2345,
                user="maxqu01",
                dbname="world",
                query=f"select * from country join city on city.id = country.capital where region = '{region}';",
            )
            regionCACHE[region] = result
        return render_template("result.html", rows=result, title=region)
    

@app.route("/<string:scope>", methods=["GET"])
def search(scope: str):
    if scope == "country":
        global THE_COUNTRIES
        if not THE_COUNTRIES:
            THE_COUNTRIES = get_data_from_db(
                host="localhost",
                port=2345,
                user="maxqu01",
                dbname="world",
                query="select code, name from country;",
            )
        return render_template("country.html", options=THE_COUNTRIES)
    if scope == "region":
        global THE_REGIONS
        if not THE_REGIONS:
            THE_REGIONS = get_data_from_db(
                host="localhost",
                port=2345,
                user="maxqu01",
                dbname="world",
                query="select region from country group by region;",
            )
        return render_template("region.html", options=THE_REGIONS)
    if scope == "continent":
        global THE_CONTINENTS
        if not THE_CONTINENTS:
            THE_CONTINENTS = get_data_from_db(
                host="localhost",
                port=2345,
                user="maxqu01",
                dbname="world",
                query="select continent from country group by continent;",
            )
        return render_template("continent.html", options=THE_CONTINENTS)