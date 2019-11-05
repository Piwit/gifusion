# GIFusion Back End

## Setup

A simple Flask API to gather data from various sources. Built with python 3.6

You need to set the following environment variable to run the app

* GIPHY_KEY : containing your Giphy API Key
* TENOR_KEY : containing your Tenor API Key

Install requirements with pip

`pip install -r requirements.txt`

Procfile is used to deploy on heroku

## Deploy on heroku

You must have installed heroku-cli

Run the following command after pushing to master to deploy on heroku

`git subtree push --prefix gifusion_back heroku master`
