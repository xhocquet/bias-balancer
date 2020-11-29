import pandas as pd
import numpy as np
import os

basePath = os.path.dirname(os.path.abspath(__file__))
df = pd.read_json(basePath + '/news_source_data-2020-11-28.json', orient = 'records', dtype={"article_id":int})
s = df['url'].str.extract("://www1?\.?([a-zA-Z0-9]+\.[a-z]{2,3})", expand=False)
df1 = df.groupby(s)
agg_bias_mean = df1['bias'].agg([np.mean])
agg_bias_mean.to_json(basePath + '/source/bias_data.json')
