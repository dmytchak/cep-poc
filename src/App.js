import React, { useState, useRef, useEffect } from 'react';
import './style.css';

export default function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [displayIFrame, setDisplayIFrame] = useState(false);
  const hiddenIframeRef = useRef(null);
  const access_token = useState(null);

  const dispIFrame = () => {
    const param = {
      CLIENT_SYSTEM_ID: 'cepheid_ecom',
      SECURITY_KEY: '',
      DI_ACCESS_TOKEN: accessToken,
      MERCHANT_ID: 'HIGHRAD',
      CARD_TYPE: '',
      CARD_NUMBER: '        ',
      PROCESSOR: 'firstdata',
      TRANSACTION_TYPE: 'Tokenize',
      REQUEST_ID: '896745',
      REFERENCE_NUMBER: '896745',
      REQUESTOR: 'kaching',
      DATA_LEVEL: '1',
      POST_BACK_URL:
        'https://pruat.paymentsradius.com/PaymentsRadiusDI/iframeResult.jsp',
      STRING_URL: 'http%3A%2F%2Fpruat.paymentsradius.com%2F',
      CALLING_APP: 'EIPP',
      CURRENCY_CODE: 'USD',
      BILL_TO_AVSCHECK_REQUIRED: 'true',
      BILL_TO_STREET1: 'addq1',
      BILL_TO_STREET2: 'asds',
      BILL_TO_COUNTRY: 'USA',
      BILL_TO_CITY: 'hyd',
      BILL_TO_STATE: 'California',
      BILL_TO_FIRST_NAME: 'VAx MEDICAL CENTER 123',
      BILL_TO_LAST_NAME: 'DESERT PACIFIC HEALTHCARE NETWORK',
      PAYMENT_AMOUNT: '150.00',
      BILL_TO_POSTAL_CODE: '',
      IS_CVV_MANDATORY: 'TRUE',
      BILL_TO_COMPANY: 'HIGHRADIUS',
      BILL_TO_EMAIL: 'generaldist@geinc.com',
      BILL_TO_PHONE: '332535 23423',
      CSS_FILE_NAME: 'TRIFECTA_DI_CSS',
      JS_FILE_NAME: 'TRIFECTA_DI_JS',
      LANGUAGE_CODE: 'en',
      IS_PRE_POPULATE_DI: '',
      ENABLE_KEYPAD_DI: 'false',
    };

    const referrerUrl = document.referrer;
    console.log(referrerUrl);
    const form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute(
      'action',
      'https://pruat.paymentsradius.com/PaymentsRadiusDI/v2/checkOut.do'
    );
    form.setAttribute('target', 'hiddenIframe');

    for (let i in param) {
      if (param.hasOwnProperty(i)) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = i;
        input.value = param[i];
        form.appendChild(input);
      }
    }
    document.body.appendChild(form);
    form.submit();
    return () => {
      console.log('token: ' + document.body);
      document.body.removeChild(form);
    };
  };

  const getAccess = () => {
    var data = JSON.stringify({
      securityKey:
        'Whatever you would like to put to secure the Server Side call',
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    //Emulating server side Access Token
    xhr.open(
      'POST',
      'https://glacial-cliffs-78227-e5b87b59c5df.herokuapp.com/access-token'
    );
    xhr.setRequestHeader('Content-Type', 'application/json');
    // WARNING: Cookies will be stripped away by the browser before sending the request.
    xhr.setRequestHeader(
      'Cookie',
      'JSESSIONID=4A66734DD6D3772C18C73FFD7F2C775F-n2'
    );
    console.log('Sending payload: ' + data);
    xhr.send(data);
    xhr.onload = function () {
      {
        if (xhr.status == 200) {
          var response = xhr.responseText;
          const jsonResp = JSON.parse(xhr.responseText);

          setAccessToken(jsonResp.accessToken);
          console.log('Returned Payload ' + response);
          console.log(' Access Token: ' + access_token);
          setDisplayIFrame(true);
        }
      }
    };

    setDisplayIFrame(true);
  };
  return (
    <html>
      <body>
        <form
          id="modelForm"
          method="post"
          action="https://prtest.paymentsradius.com/PaymentsRadiusDI/v2/checkOut.do"
        >
          <input
            type="hidden"
            name="CLIENT_SYSTEM_ID"
            value="abc_manufacturing"
          />
          <input
            type="hidden"
            name="DI_ACCESS_TOKEN"
            value="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzZWQ3OWEzYi03NzA5LTQ2NmUtODM4MS1lMGIyMjU0NDQzMzgiLCJpZGVudGlmaWVyIjoicGF5bWVudHNyYWRpdXMiLCJpYXQiOjE2ODgwNDkzMzQsImV4cCI6MTY4ODA1MjkzNH0._p6sTXpWDShmTIYiruAqluvLFPXI18RIrpDnlhbnHLbgDO4Vc4C8CfQVb8lZ-mDRe5wh-_aVra3RenPB0Mm2wA"
          />
          <input type="hidden" name="TRANSACTION_TYPE" value="TOKENIZE" />
          <input type="hidden" name="CARD_TYPE" value="" />
          <input type="hidden" name="CALLING_APP" value="EIPP" />
          <input type="hidden" name="REQUEST_ID" value="11445566" />
          <input type="hidden" name="REFERENCE_NUMBER" value="11445566" />
          <input type="hidden" name="DATA_LEVEL" value="1" />
          <input
            type="hidden"
            name="POST_BACK_URL"
            value="https://prtest.paymentsradius.com/PaymentsRadiusDI/multiTokenResult.jsp"
          />
          <input type="hidden" name="REQUESTOR" value="IframeTesting" />
          <input
            type="hidden"
            name="BILL_TO_STREET1"
            value="Green Park Streets"
          />
          <input type="hidden" name="BILL_TO_FIRST_NAME" value="John" />
          <input type="hidden" name="BILL_TO_LAST_NAME" value="Smith" />
          <input type="hidden" name="BILL_TO_CITY" value="Mountain" />
          <input type="hidden" name="BILL_TO_STATE" value="CA" />
          <input type="hidden" name="BILL_TO_COUNTRY" value="USA" />
          <input type="hidden" name="BILL_TO_POSTAL_CODE" value="94043" />
          <input type="hidden" name="PAYMENT_AMOUNT" value="100" />
          <input type="hidden" name="IS_MULTI_TOKEN" Value="FALSE" />
          <input type="hidden" name="PROCESSOR" Value="firstdata" />
          <input type="submit" name="TOKENIZE" value="TOKENIZE" />
        </form>
      </body>

      <div>
        <h1>Welcome to the Sandbox</h1>
        <p>Press the 'Get Access Token' button to generate an access token</p>
        {displayIFrame && (
          <p>Then press the Display iFrame button to render the HRC iFrame</p>
        )}
        <button onClick={() => getAccess()}>Get Access Token</button>
        {displayIFrame && (
          <button onClick={() => dispIFrame()}>Display iFrame</button>
        )}

        <iframe
          ref={hiddenIframeRef}
          id="hiddenIframe"
          name="hiddenIframe"
          style={{ width: '800px', height: '600px' }}
          title="Hidden Iframe"
        />
      </div>
    </html>
  );
}
