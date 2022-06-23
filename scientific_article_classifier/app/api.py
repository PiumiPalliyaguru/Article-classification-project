import json
from numpy import double
import pickle

import uvicorn
#The following is added in the later solution
import nest_asyncio
nest_asyncio.apply()

from typing import Dict, List, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from mangum import Mangum

from .classifier import model, classifier


with open("config.json") as json_file:
  config = json.load(json_file)


app = FastAPI()

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ArticleRequest(BaseModel):
    articleTitle: Optional[str] = None
    articleAbstract: str
    thresholdValue: Optional[double] = 0


class ArticleResponse(BaseModel):
    categories: Dict[str, float] 



# load pickle file with param dict
PREDICT_PARAMS_DICT_PATH = config["PREDICT_PARAMS_DICT_PATH"]
PREDICT_PARAMS_DICT = pickle.load(open(PREDICT_PARAMS_DICT_PATH, 'rb'))
MODEL_PATH = "assets/" + PREDICT_PARAMS_DICT['best_model_path']
MODEL = model.load_model(PREDICT_PARAMS_DICT, MODEL_PATH)


#predict article category
async def predictCategory(request: ArticleRequest):
  text = request.articleTitle + '. ' + request.articleAbstract

  if len(request.articleAbstract) < 10 : 
     raise HTTPException(400, "Bad Request. Article abstract lenth should be more than 10 characters.")
    
  input_text = classifier.prep_text(text)
  results = classifier.predict_text(input_text, MODEL, PREDICT_PARAMS_DICT, request.thresholdValue)
  print('\nCategory result: ', result)
  result = dict(results)

  return ArticleResponse(
    categories= result,
    )


@app.get("/")
async def get_categories():
  """
   **ScholarBERT**  article categories.
  """
  categories = PREDICT_PARAMS_DICT['categories']
  print(len(categories))
  return categories


#predict article category api
@app.post("/predict", response_model=ArticleResponse)
async def predict(request: ArticleRequest):
  """
  Analyze an article data and extract categories of the article with **ScholarBERT**.
  """
  try:
    return await predictCategory(request)
  except Exception:
    raise HTTPException(400, "Something went wrong / Bad Request")
    return 1

#predict article category
async def predictCategory(request: ArticleRequest):
  text = request.articleTitle + '. ' + request.articleAbstract

  if len(request.articleAbstract) < 50 : 
     raise HTTPException(400, "Bad Request. Article abstract lenth should be more than 10 characters.")
    
  input_text = classifier.prep_text(text)
  results = classifier.predict_text(input_text, MODEL, PREDICT_PARAMS_DICT, request.thresholdValue)
  result = dict(results)
  print('\nCategory result: ', result)

  return ArticleResponse(
    categories= result,
    )


handler = Mangum(app)
