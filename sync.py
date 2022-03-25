import requests
import json


def update_file(url, name):
    with open(name, 'wb') as file:
        file.write(requests.get(url).content)


def github(sha_old, name):
    url = "https://api.github.com/repos/Twelve-blog/picture/contents/?ref=master"
    data = requests.get(url).json()
    for item in data:
        if (item['name'] == name) and (item['sha'] != sha_old):
            update_file(item['download_url'], name)
            sha[name] = item['sha']


def gitee(sha_old, name):
    url = "https://gitee.com/api/v5/repos/lctwelve/picture/contents"
    data = requests.get(url).json()
    for item in data:
        if (item['name'] == name) and (item['sha'] != sha_old):
            update_file(item['download_url'], name)
            sha[name] = item['sha']


if __name__ == '__main__':
    with open('sha.json') as f:
        sha = json.load(f)
    github(sha['QuestionBank.db'], 'QuestionBank.db')
    github(sha['replace.js'], 'replace.js')
    gitee(sha['question'], 'question')
    with open('sha.json', 'w') as f:
        json.dump(sha, f)
