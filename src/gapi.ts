import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';

const clientId = '438973009190-htdb78m4crjasupm36tolspujoma293r.apps.googleusercontent.com';

export const useGoogleSheets = () => {
  const [data, setData] = useState<any>();
  const [isGapiInit, setIsGapiInit] = useState<boolean>(false);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId,
        scope: 'https://www.googleapis.com/auth/spreadsheets',
      }).then(() => setIsGapiInit(true));
    }
    gapi.load('client:auth2', initClient);
  });

  useEffect(() => {
    if (!isGapiInit) {
      return;
    }

    const auth = gapi.auth2.getAuthInstance();
    const user = auth.currentUser.get();
    const access_token = user.getAuthResponse().access_token;
  
    const baseUrl = 'https://sheets.googleapis.com';
    const sheetId = '19dJEs33J0J_1dy-gKZ_jznelnSHhzQ7HkzJ3_PfkG78';
  
    gapi.client.request({
      method: 'get',
      path: `${baseUrl}/v4/spreadsheets/${sheetId}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        includeGridData: true,
      }
    }).then((res: any) => {
      setData(res.result);
    }).catch((e: any) => {
      setData(e);
    });
  }, [isGapiInit]);

  return data;
}
