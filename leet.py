def isPalindrome(x):
    n = 0
    x1 = x
    while x1 != 0:
        n = n * 10 + x1 % 10
        x1 = x1 // 10
    print(n == x)


# isPalindrome(1000021)


def e(x):
    if x < 0:
        return False
    else:
        n = str(x)
        for i in range(len(n)):
            if n[i] != n[len(n) - 1 - i]:
                return False
        return True


# print(e(1000021))
# print(1//10)
import requests

payload = {"username": "lis", "password": "123"}

r = requests.post('http://192.168.1.181:8082/login', params=payload)
print(r.text)
print(r.status_code)
