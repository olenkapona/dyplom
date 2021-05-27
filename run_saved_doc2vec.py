import sys
from sklearn.preprocessing import LabelEncoder
import pickle
import pandas as pd
from nltk.tokenize import word_tokenize
from gensim.models.doc2vec import Doc2Vec, TaggedDocument
from nltk.corpus import stopwords
stop_words = set(stopwords.words('english'))

#input_data = 'war'
input_data = sys.argv[1]


train = 'C:/Users/Olena/Desktop/Диплом/Data/books_annotation.csv'
features = ['Blurb','Title']
train_data = pd.read_csv(train, encoding='latin1', delimiter=';', usecols=features, nrows=10000)

# load the model from disk
filename = 'C:/Users/Olena/PycharmProjects/untitled1/doc2vec.sav'
model = pickle.load(open(filename, 'rb'))

# find most similar doc
test_doc = word_tokenize(input_data.lower())
filtered_words = []
for i in test_doc:
     if i not in stop_words:
        filtered_words.append(i)

most_sim = model.docvecs.most_similar(positive=[model.infer_vector(test_doc)],topn=15)

most_similar_docs = []
weights = []
for d, w in most_sim:
     most_similar_docs.append(train_data.iloc[d]['Title'])
     weights.append(w)
for data in most_similar_docs:
  print(data)
#print(weights)
