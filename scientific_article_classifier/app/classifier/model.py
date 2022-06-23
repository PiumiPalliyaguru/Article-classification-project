import torch

from transformers import BertForSequenceClassification

# load model
def load_model(predict_params_dict, model_path):
  model = BertForSequenceClassification.from_pretrained(predict_params_dict['base_model_path'], num_labels=predict_params_dict['number_of_labels'])
  model.load_state_dict(torch.load(model_path, map_location = torch.device('cpu')))
  model.eval()
  return model