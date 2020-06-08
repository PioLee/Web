# coding:utf-8
# Backend Api
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient

app = FastAPI()


# 解决跨域请求
def cors():
    origins = ["*"]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


cors()


class Product(BaseModel):
    name: str
    image: str
    price: float
    description: str
    manufacturer: str


class Manufacturer(BaseModel):
    name: str


# 连接到MongoDB
client = MongoClient()
db = client.test
collection_m = db.manufacturers
collection_p = db.products


# 查询所有厂商
@app.get("/manufacturers")
async def query_manufacturers():
    data = collection_m.find()
    res = []
    for i in data:
        i['_id'] = str(i['_id'])
        res.append(i)
    return {"msg": res}


# 查询单个厂商
@app.get("/manufacturers/{mid}")
async def query_manufacturer(mid: str):
    try:
        data = collection_m.find_one({"name": mid})
        # MongoDB中_id是ObjectId对象,要转换成python可识别的对象
        data['_id'] = str(data['_id'])
    except TypeError:
        data = "没有查询到信息,请检查输入是否正确"
    return {"msg": data}


# 新建厂商
@app.post("/manufacturers")
def create_manufacturer(item: Manufacturer):
    # 如果数据库中已经存在就不新增,根据name判断
    collection_m.update_one({"name": item.name}, {"$set": item.dict()}, upsert=True)
    return {'msg': '新增厂商成功'}


# 更新厂商
@app.put("/manufacturers/{mid}")
def update_manufacturer(mid: str, item: Manufacturer):
    # matched_count和modified_count属性，可以获得匹配的数据条数和影响的数据条数
    res = collection_m.update_one({"name": mid}, {"$set": item.dict()})
    print(res.matched_count, res.modified_count)
    if res.matched_count == 1 and res.modified_count == 1:
        return {"msg": "更新成功"}
    else:
        return {"msg": "更新失败,没有搜索到该厂商或者厂商名没有改变"}


# 删除厂商
@app.delete("/manufacturers/{mid}")
def delete_manufacturer(mid: str):
    res = collection_m.delete_many({"name": mid})
    # deleted_count属性获取删除的数据条数
    print(res.deleted_count)
    if res.deleted_count > 0:
        return {'msg': 'OK'}
    else:
        return {'msg': '删除失败,没有找到匹配的数据'}


# 查询所有产品
@app.get("/products")
def query_products():
    data = collection_p.find()
    res = []
    for i in data:
        # print(i)
        i['_id'] = str(i['_id'])
        i['manufacturer'] = str(i['manufacturer'])
        res.append(i)
    return {"msg": res}


# 查询单个产品
@app.get("/product/{pid}")
def query_product(pid: str):
    try:
        data = collection_p.find_one({"name": pid})
        # MongoDB中_id是ObjectId对象,要转换成python可识别的对象
        data['_id'] = str(data['_id'])
    except TypeError:
        data = "没有查询到信息,请检查输入是否正确"
    return {"msg": data}


# 新建产品
@app.post("/products")
def create_product(item: Product):
    print(item.manufacturer)
    # 检查制造商是否存在
    data = collection_m.find_one({"name": item.manufacturer})
    print(data)
    if data:
        collection_p.update_one({"name": item.name}, {"$set": item.dict()}, upsert=True)
        return {'msg': '新建成功'}
    else:
        return {'msg': '没有查询到该厂商的信息,请重新填写'}


# 更新产品
@app.put("/product/{pid}")
def update_product(pid: str, item: dict):
    res = collection_p.update_one({"name": pid}, {"$set": item})
    print(res.matched_count, res.modified_count)
    if res.matched_count == 1 and res.modified_count == 1:
        return {"msg": "更新成功"}
    else:
        return {"msg": "更新失败,没有搜索到该厂商或者厂商名没有改变"}


# 删除产品
@app.delete("/product/{pid}")
def delete_product(pid: str):
    res = collection_p.delete_many({"name": pid})
    # deleted_count属性获取删除的数据条数
    print(res.deleted_count)
    if res.deleted_count > 0:
        return {'msg': 'OK'}
    else:
        return {'msg': '删除失败,没有找到匹配的数据'}
