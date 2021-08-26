from django.shortcuts import render
import requests
from django.http import HttpResponse, JsonResponse
import json


# Create your views here.

'''to render homepage'''
def home(request):
    return render(request,'index.html')

'''end'''
'''return all queries from api'''
def getQueries(request,params,pk):

    queries=requests.get('https://api.stackexchange.com/2.3/search/advanced?page='+str(pk)+'&order=desc&sort=activity&'+params+'&site=stackoverflow')
    result=queries.json()   #converting raw data into json
    data=result["items"]    
    #question list
    ans=[]
    for i in range (0,len(data)):
        ans.append(data[i]["title"])
    #list of links of the questions
    links=[]
    for i in range (0,len(data)):
        links.append(data[i]["link"])

    response={}
    response=dict(zip(ans,links))   #join the question and respective links in python dict

    return JsonResponse(response,safe=False)

'''end'''