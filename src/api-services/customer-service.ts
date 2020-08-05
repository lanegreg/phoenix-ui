import { useEffect, useState } from 'react'
import { ENDPOINT, JSON_CONTENT_TYPE } from './service-config'

const url = `${ENDPOINT}/customers`

const useCustomersData = () => {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    getAllCustomers().then(data => {
      if (data.status === 200) {
        data.promise.then(json => {
          setCustomers(json)
        })
      }
    })
  }, [])

  return customers
}

const getAllCustomers = async () => {
  return await fetch(url, {
    method: 'GET',
    cache: 'no-cache',
    headers: { ...JSON_CONTENT_TYPE }
  }).then(res => {
    if (res.ok) {
      return { status: res.status, promise: res.json() }
    }

    return { status: res.status, promise: res.text() }
  })
}

export { useCustomersData }

const customerService = () => {
  return [
    {
      name: 'customer4',
      Address: '123anyplace',
      id: '411777e3-2b8c-44bf-9b09-4be3e858a5bb',
      employid: '4ae35d0c-c4db-4c38-ac15-c5c6c0c83fec'
    },
    {
      id: '886988b6-e994-4bdf-9ba7-dc4e9f40ce6d',
      name: 'customer4',
      employid: '4ae35d0c-c4db-4c38-ac15-c5c6c0c83fec',
      Address: '123anyplace'
    },
    {
      id: '87014403-8053-4d80-ac1f-990c9753db67',
      name: 'customer4',
      Address: '123anyplace',
      employid: '4ae35d0c-c4db-4c38-ac15-c5c6c0c83fec'
    },
    {
      Address: '123anyplace',
      name: 'customer9',
      id: '498f6168-2499-4d60-8881-8fdce163bfc1',
      employid: '4ae35d0c-c4db-4c38-ac15-c5c6c0c83fec'
    },
    {
      Address: '123anyplace',
      id: 'e6372684-2661-4564-b892-0e394863e542',
      name: 'customer10',
      employid: '4ae35d0c-c4db-4c38-ac15-c5c6c0c83fec'
    },
    {
      Address: '123anyplace',
      id: '551f6e51-03ba-4e5a-ab1a-526367553edd',
      employid: '4ae35d0c-c4db-4c38-ac15-c5c6c0c83fec',
      name: 'customer10'
    },
    {
      id: '6767f1a1-e1d4-4e59-a7a4-a3f40f10abfb',
      employid: '4ae35d0c-c4db-4c38-ac15-c5c6c0c83fec',
      name: 'BC Test 1',
      Address: '2201 Parkview Blvd, COS, CO 80906'
    },
    {
      Address: '2201 Parkview Blvd, COS, CO 80906',
      employid: '4ae35d0c-c4db-4c38-ac15-c5c6c0c83fec',
      id: '01078d2f-4d22-48fe-9046-c0bba0d56ae0',
      name: 'BC Test 2'
    },
    {
      id: '16ec6d31-1be2-4ffd-880c-e4f45bc2b991',
      name: 'BC Test 3',
      employid: '4ae35d0c-c4db-4c38-ac15-c5c6c0c83fec',
      Address: '2201 Parkview Blvd, COS, CO 80906'
    },
    {
      id: 'd953454b-84af-474e-8743-46bafd94799a',
      Address: '2201 Parkview Blvd, COS, CO 80906',
      name: 'BC Test 4',
      employid: '4ae35d0c-c4db-4c38-ac15-c5c6c0c83fec'
    },
    {
      Address: '123 Yonge st',
      name: 'MArk Joseph',
      employid: '4ae35d0c-c4db-4c38-ac15-c5c6c0c83fec',
      id: '19f76fb6-7cec-4a0a-84dd-73b3cd3d1c37'
    },
    {
      id: '913c1d0d-2a43-482c-a7ab-10070e174c74',
      employid: '4ae35d0c-c4db-4c38-ac15-c5c6c0c83fec',
      name: 'tom',
      Address: null
    },
    {
      Address: null,
      employid: '4ae35d0c-c4db-4c38-ac15-c5c6c0c83fec',
      name: 'tom',
      id: 'c80fddd8-d262-4a79-973e-2006dfce66df'
    },
    {
      Address: '123 fake street',
      name: 'Acme',
      employid: '4ae35d0c-c4db-4c38-ac15-c5c6c0c83fec',
      id: '3f9d0774-7e6b-41d8-b661-973f13b63671'
    },
    {
      name: 'test 5',
      id: 'e5ed9ff6-95e8-424d-93f2-584126f51d07',
      employid: 'acb86121-7846-4bda-a466-fa3554d3a8de',
      Address: '5 Great Street'
    },
    {
      name: 'Test-o-rama',
      Address: null,
      id: 'dd7c6426-0b22-4969-9c5e-ed6bd15a196a',
      employid: '4ae35d0c-c4db-4c38-ac15-c5c6c0c83fec'
    },
    {
      employid: '39eba82c-5794-41ce-a82c-37d6110db2e2',
      name: 'Customer123',
      id: '119563a3-becc-4e12-9c1b-eda204275de7',
      Address: 'address123'
    },
    {
      employid: '39eba82c-5794-41ce-a82c-37d6110db2e2',
      Address: '123 Main St',
      id: 'f40ecc90-dfa7-4146-82c2-7671f310df1e',
      name: 'test'
    },
    {
      id: '60af1be4-93f7-4088-a4ee-07ff775af907',
      name: 'Customer Test 1',
      Address: 'Over there',
      employid: 'b984fbc9-a392-4d23-aa02-df5a019bc97b'
    },
    {
      Address: 'Testaddress123',
      id: 'ad4749ef-15db-4a50-bf07-51f559802fda',
      name: 'TestCustomer123',
      employid: '39eba82c-5794-41ce-a82c-37d6110db2e2'
    },
    {
      id: '0a656263-c1b7-4aff-b92e-cbe659a7bedd',
      employid: '72a34174-ca47-41f3-a2c6-0099d6551f9f',
      Address: null,
      name: 'cust test'
    },
    {
      id: '820c3a69-c5fe-4099-8d29-4b2ee5b17dcb',
      Address: null,
      name: 'Fix error',
      employid: '4ae35d0c-c4db-4c38-ac15-c5c6c0c83fec'
    },
    {
      id: 'd3b7e999-b6cd-4e63-afef-062eb7f60064',
      employid: '4ae35d0c-c4db-4c38-ac15-c5c6c0c83fec',
      name: 'New Cust',
      Address: null
    },
    {
      Address: null,
      id: '933607fd-9022-4f8e-a8fb-2987b139e41d',
      name: 'New Cust 2',
      employid: 'd643e381-df8c-43b2-844e-d816baca5828'
    },
    {
      name: 'test ',
      employid: '4ae35d0c-c4db-4c38-ac15-c5c6c0c83fec',
      id: '7ab7d000-9f32-468a-bd53-d568b6c95cfd',
      Address: null
    },
    {
      id: '5f0a0bc0-1d22-4eee-9861-057ae2e4447d',
      name: 'Customer again',
      employid: '3ead434a-5243-418b-974c-7f8f4840210e',
      Address: null
    },
    {
      Address: null,
      employid: 'd643e381-df8c-43b2-844e-d816baca5828',
      name: 'customer',
      id: '77adff79-1390-4713-9778-f3c57ac142cb'
    },
    {
      name: 'test',
      employid: 'd643e381-df8c-43b2-844e-d816baca5828',
      id: 'f7e5a2b2-3f9b-40ea-bc51-f8c1268abffa',
      Address: null
    },
    {
      id: '3d15454f-5714-4df7-a206-d9df226c298e',
      name: 'test2',
      employid: '4ae35d0c-c4db-4c38-ac15-c5c6c0c83fec',
      Address: null
    }
  ]
}

export { customerService }
