from django.shortcuts import render
import numpy as np
import pandas as pd

# Create your views here.
def index(request):
    N = 50
    values_x = np.random.rand(N)
    values_y = np.random.rand(N)

    df = pd.DataFrame({'x':values_x, 'y':values_y})
    df_json = df.to_json(orient='records')

    return render(request, 'd3scatter/scatterexample.html', {'random_data':df_json})