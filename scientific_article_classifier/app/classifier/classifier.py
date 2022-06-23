import torch
import pandas as pd

from transformers import BertTokenizer


def prep_text(text):
  text = text.lower().strip()
  text = text.replace('\n', ' ').replace(r'\s\s+', ' ')
  text = text.replace('([.,!?()])', r' \1')
  return text

def tokenize_text(text, model_path, max_length_tokenize):
  tokenizer = BertTokenizer.from_pretrained(model_path)
  tokenized_abstract = tokenizer.encode_plus(
      text,
      max_length = max_length_tokenize, # from model
      padding = True,
      truncation = True,
      return_attention_mask = True,
      return_token_type_ids = False,
      return_tensors = 'pt'
  )
  return tokenized_abstract

def predict_text(text, model, predict_params_dict, threshold):
  # text processing
  input_text = prep_text(text)
  print('INPUT:', input_text)
  tokenized_text = tokenize_text(text = input_text,
                                  model_path = predict_params_dict['base_model_path'],
                                  max_length_tokenize = predict_params_dict['max_length_tokenize'])
  
  abstracts_ = tokenized_text['input_ids']
  masks_ = tokenized_text['attention_mask']

  logits = model(input_ids = abstracts_, attention_mask = masks_)[0]
  logits = torch.sigmoid(logits)
  logits = logits.detach().numpy()[0]

  ## generate results
  results_series = pd.Series(dict(zip(predict_params_dict['categories'], logits)))

  if len(results_series[results_series > threshold]) == 0:
    result = {'No relevant category': 0.00}
  else:
    result = results_series[results_series > threshold].sort_values(ascending = False)

  return result