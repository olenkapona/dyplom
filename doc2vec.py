#Import packages
import gensim
from gensim.models.doc2vec import Doc2Vec, TaggedDocument
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import pandas as pd
import numpy as np
import pickle

stop_words = set(stopwords.words('english'))

train = 'C:/Users/Olena/Desktop/Диплом/Data/books_annotation.csv'
features = ['Blurb','Title']
train_data = pd.read_csv(train, encoding='latin1', delimiter=';', usecols=features, nrows=10000)


train_data.dropna(subset = ["Blurb"], inplace=True)
train_data.dropna(subset = ["Title"], inplace=True)
X_train = np.array(train_data[features]).astype(str)

#tokenize
tokenized_doc = []
for row in train_data['Blurb']:
    tokenized_doc.append(row.split())

#remove stopwords
filtered_words = []
for i in tokenized_doc:
    lst = []
    for j in i:
        if j not in stop_words:
            lst.append(j)
    filtered_words.append(lst)


# Convert tokenized document into gensim formated tagged data
tagged_data = [TaggedDocument(d, [i]) for i, d in enumerate(filtered_words)]

## Train doc2vec model
model = Doc2Vec(tagged_data, vector_size=20, window=2, min_count=5, epochs = 15)
#model.build_vocab(tagged_data)
model.train(tagged_data, total_examples=model.corpus_count, epochs=model.epochs)

#model.dv = model.__dict__['docvecs']
# save the model to disk
filename = 'doc2vec.sav'
pickle.dump((model), open(filename, 'wb'))

