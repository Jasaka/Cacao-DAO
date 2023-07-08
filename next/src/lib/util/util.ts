import { NextApiRequest } from "next"

export function isGet(request: NextApiRequest): boolean {
  return request.method === 'GET'
}

export function isNotGet(request: NextApiRequest): boolean {
  return request.method !== 'GET'
}

export function isPost(request: NextApiRequest): boolean {
  return request.method === 'POST'
}

export function isNotPost(request: NextApiRequest): boolean {
  return request.method !== 'POST'
}

export function isPut(request: NextApiRequest): boolean {
  return request.method === 'PUT'
}

export function isNotPut(request: NextApiRequest): boolean {
  return request.method !== 'PUT'
}

export function isDelete(request: NextApiRequest): boolean {
  return request.method === 'DELETE'
}

export function isNotDelete(request: NextApiRequest): boolean {
  return request.method !== 'DELETE'
}

export function verboseLog(firstPos: any, secondPos?: any): void {
  if (process.env.VERBOSE_LOGGING === 'true') {
    console.log("######## LOG ########")
    if (secondPos) {
      console.log(firstPos, secondPos)
    } else {
      console.log(firstPos)
    }
    console.log("------- /LOG -------")
  }
}

export function errorLog(firstPos: any, secondPos?: any): void {
  if (process.env.ERROR_LOGGING === 'true') {
    console.log("######## ERROR ########")
    if (secondPos) {
      console.error(firstPos, secondPos)
    } else {
      console.error(firstPos)
    }
    console.log("------- /ERROR -------")
  }
}