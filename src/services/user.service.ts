import {
  ENDPOINT,
  LoggedInUserData,
  Response,
  UserAttributes,
  ReportDataList,
} from '../types/types'

import { callEndpoint } from '../helpers/utility'

export const UserService = {
  getUserInfo,
  updateUserAttributes,
  updateUserData,
  getAppointments,
}

async function getUserInfo(token: string): Promise<Response<LoggedInUserData>> {
  const result = await callEndpoint<LoggedInUserData>(
    `${ENDPOINT}/v3/participants/self`,
    'GET',
    {},
    token,
  )
  return result
}

async function updateUserAttributes(
  token: string,
  attributes: UserAttributes,
): Promise<Response<LoggedInUserData>> {
  const result = await callEndpoint<LoggedInUserData>(
    `${ENDPOINT}/v3/participants/self`,
    'POST',
    {
      attributes,
    },
    token,
  )
  return result
}

async function updateUserData(
  token: string,
  data: LoggedInUserData,
): Promise<Response<LoggedInUserData>> {
  const payload = {
    firstName: data.firstName,
    lastName: data.lastName,
    attributes: data.attributes,
  }
  const result = await callEndpoint<LoggedInUserData>(
    `${ENDPOINT}/v3/participants/self`,
    'POST',
    payload,
    token,
  )
  return result
}

async function getAppointments(
  token: string,
): Promise<Response<ReportDataList>> {
  const result = await callEndpoint<ReportDataList>(
    `${ENDPOINT}/v3/users/self/reports/appointment?startDate=1970-01-01&endDate=1970-01-01`,
    'GET',
    {},
    token,
  )
  return result
}
