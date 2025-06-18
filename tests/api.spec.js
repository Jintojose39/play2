import { test,expect} from "playwright/test";


test('Handling Get method', async ({request}) => {
     const response = await request.get('https://reqres.in/api/users?page=2')
     expect(response.status()).toBe(200)
 })
 
 test('Handling POST method', async ({request}) => {
     const response = await request.post('https://reqres.in/api/users',{data:{"name": "morpheus","job": "leader"},headers:{'accept':'application/json','x-api-key': 'reqres-free-v1'}})
 const responseJson = await response.json()
     console.log(await responseJson)
     const name = await responseJson.name
     console.log(await name)
     expect(response.status()).toBe(201)
     expect(await responseJson.name).toBe('morpheus')
 })
 test('Handling Put method', async ({request}) => {
     const response = await request.put('https://reqres.in/api/users/2', 
         {
             data:{
                 "name": "morpheus",
                 "job": "zion resident"
             },
             headers:{
                 'accept':'application/json',
                 'x-api-key': 'reqres-free-v1'
 
             }
         })
        const responseJson =  await response.json()
        console.log(await responseJson)
        expect(response.status()).toBe(200)
})
test('Handling Patch method', async ({request}) => {
    const response = await request.patch('https://reqres.in/api/users/2', 
        {
            data:{
                "name": "morpheus",
                "job": "zion resident"
            },
            headers:{
                'accept':'application/json',
                'x-api-key': 'reqres-free-v1'

            }
        })
       const responseJson =  await response.json()
       console.log(await responseJson)
expect(response.status()).toBe(200)
})
test('Handling Delete Method', async ({request}) => {
    const response = await request.delete('https://reqres.in/api/users/2',{headers:{'x-api-key': 'reqres-free-v1'}})
    expect(response.status()).toBe(204)
})