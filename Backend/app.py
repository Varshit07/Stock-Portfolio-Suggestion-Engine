from get_data import invested_amount
from flask import Flask, render_template, request, jsonify
from flask_cors import cross_origin
import json
app = Flask(__name__)

@app.route('/',methods = ['POST','GET'])
@cross_origin(app)
def index():
    req = request.form.to_dict(flat=False)
    if request.method == 'POST':       
        response = invested_amount(int(req['share'][0]),req['investmenttype'][0])
        if len(req['investmenttype'])>1:
            resp = invested_amount(int(req['share'][0]),req['investmenttype'][1])
            combine = {
                'Stock': response['Stock'],
                'Stock1': resp['Stock'],
                'Lastfive': response['Lastfive'],
                'Lastfive1': resp['Lastfive']
            }
            return jsonify(combine)
        combine = {
                'Stock': response['Stock'],
                'Stock1': [],
                'Lastfive': response['Lastfive'],
                'Lastfive1': [],
            }
        return jsonify(combine)
    else:
        return render_template('index.html')

if __name__ == "__main__":
    app.run(debug = True)