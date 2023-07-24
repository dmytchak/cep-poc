import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './style.css';

export default function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [styleDisplay, setStyleDisplay] = useState('none');
  const [displayIFrame, setDisplayIFrame] = useState(false);
  const [displayIFrameButton, setDisplayIFrameButton] = useState(null);
  const [displayHTMLButton, setDisplayIHTMLButton] = useState(null);
  const hiddenIframeRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [eventData, setEventData] = useState(null);
  const httpFormRef = useRef(null);

  const [formFields, setFormFields] = useState({
    CLIENT_SYSTEM_ID: 'abc_manufacturing',
    SECURITY_KEY: '',
    MERCHANT_ID: 'TESTHIGHRADIUS01',
    CARD_TYPE: '',
    CARD_EXPIRY_YEAR: '',
    CARD_NUMBER: '',
    PROCESSOR: 'spring',
    TRANSACTION_TYPE: 'Tokenize',

    REFERENCE_NUMBER: '11445566',
    REQUESTOR: 'kaching',
    DATA_LEVEL: '1',
    POST_BACK_URL:
      'https://glacial-cliffs-78227-e5b87b59c5df.herokuapp.com/di-post',
    STRING_URL: 'http%3A%2F%2Fprtest.paymentsradius.com%2F',
    CALLING_APP: 'Ecommerce',
    CURRENCY_CODE: 'USD',
    BILL_TO_AVSCHECK_REQUIRED: 'FALSE',
    BILL_TO_STREET1: '1234 Sunny Side St',
    BILL_TO_STREET2: 'Suite 100',
    BILL_TO_COUNTRY: 'USA',
    BILL_TO_CITY: 'San Diego',
    BILL_TO_STATE: 'CA',
    BILL_TO_FIRST_NAME: 'Widgets R Us',
    BILL_TO_LAST_NAME: 'California Widges Inc.',
    PAYMENT_AMOUNT: '150.00',
    BILL_TO_POSTAL_CODE: '12345',
    IS_CVV_MANDATORY: 'true',
    BILL_TO_COMPANY: 'HIGHRADIUS',
    BILL_TO_EMAIL: 'billus@widgets.com',
    BILL_TO_PHONE: '123.456.7890',
    CSS_FILE_NAME: 'TRIFECTA_DI_CSSxx',
    //JS_FILE_NAME: 'TRIFECTA_DI_JS',
    LANGUAGE_CODE: 'en',
    IS_PRE_POPULATE_DI: 'True',
    ENABLE_KEYPAD_DI: 'false',
    JSON_RESPONSE_REQUIRED: 'true',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const url =
      //   'https://prtest.paymentsradius.com/PaymentsRadiusDI/v2/processPayment.do';
      'https://prtest.paymentsradius.com/PaymentsRadiusDI/v2/checkOut.do';

    const formData = new FormData();

    for (const name in formFields) {
      formData.append(name, formFields[name]);
    }

    //Append the AccessCode
    formData.append('DI_ACCESS_TOKEN', accessToken);
    formData.append('REQUEST_ID', '11445566');

    /*fetch(url, {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
    })*/

    console.log('data: ', formData);

    var instance = axios.create();
    instance.defaults.headers.common = {};
    instance.withCredentials = true;
    instance
      .post(url, new URLSearchParams(formData), {
        withCredentials: true,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        },
      })
      .then((response) => {
        if (response.type == 'opaque') {
          console.log('RESPONSE: ', response);
        } else if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // further handling on successful submission
      })
      .catch((error) => {
        console.error(
          'There was a problem with the fetch operation: ' + error.message
        );
      });
  };

  const handleWebHook = () => {
    if (!listening) {
      //Display requested but we're not listening
      console.log('Setting Event Source for SSE events');
      let eventSource = new EventSource(
        `https://glacial-cliffs-78227-e5b87b59c5df.herokuapp.com/waitFor/11445566`
      );
      setListening(true);
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setEventData(data);
        console.log('Data: ', data);
        console.log(`Data for key "${data.key}" updated:`, data.payload);
        setStyleDisplay('none');
        setDisplayIFrame('false');
      };

      eventSource.onerror = (error) => {
        console.error('EventSource failed:', error);
        console.log('Closing event Source and resetting page');
        eventSource.close();
        setStyleDisplay('none');
        setDisplayIFrame(false);
      };
    }
  };
  const handleDisplayIFrameButton = () => {
    setStyleDisplay('Block');
    setDisplayIFrame(true);
    setDisplayIHTMLButton(false);

    const param = {
      CLIENT_SYSTEM_ID: 'abc_manufacturing',
      SECURITY_KEY: '',
      DI_ACCESS_TOKEN: accessToken,
      MERCHANT_ID: 'aj1205-05',
      CARD_TYPE: 'MasterCard',
      CARD_EXPIRY_YEAR: '2025',
      CARD_NUMBER: '5555444455554442',
      PROCESSOR: 'firstdata',
      TRANSACTION_TYPE: 'Tokenize',
      REQUEST_ID: '11445566',
      REFERENCE_NUMBER: '11445566',
      REQUESTOR: 'kaching',
      DATA_LEVEL: '1',
      POST_BACK_URL:
        'https://glacial-cliffs-78227-e5b87b59c5df.herokuapp.com/di-post',
      STRING_URL: 'http%3A%2F%2Fprtest.paymentsradius.com%2F',
      CALLING_APP: 'Ecommerce',
      CURRENCY_CODE: 'USD',
      BILL_TO_AVSCHECK_REQUIRED: 'FALSE',
      BILL_TO_STREET1: '1234 Sunny Side St',
      BILL_TO_STREET2: 'Suite 100',
      BILL_TO_COUNTRY: 'USA',
      BILL_TO_CITY: 'San Diego',
      BILL_TO_STATE: 'CA',
      BILL_TO_FIRST_NAME: 'Widgets R Us',
      BILL_TO_LAST_NAME: 'California Widges Inc.',
      PAYMENT_AMOUNT: '150.00',
      BILL_TO_POSTAL_CODE: '12345',
      IS_CVV_MANDATORY: 'true',
      BILL_TO_COMPANY: 'HIGHRADIUS',
      BILL_TO_EMAIL: 'billus@widgets.com',
      BILL_TO_PHONE: '123.456.7890',
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
      'https://prtest.paymentsradius.com/PaymentsRadiusDI/v2/checkOut.do'
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

    handleWebHook();

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
          setDisplayIFrameButton(true);
          setDisplayIHTMLButton(true); //Fix Service Worker code first
        }
      }
    };
  };

  const handleHtmlButtonClick = () => {
    event.preventDefault();
    setDisplayIFrame(false);
    setDisplayIHTMLButton(true);
    httpFormRef.current.submit();
    /*
    const formData = new FormData(httpFormRef.current);
    fetch('https://prtest.paymentsradius.com/PaymentsRadiusDI/v2/checkOut.do', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        console.log( 'Response: ', response);
      })
      .catch((error) => {
        console.log( 'Error: ', error);
      });
      */
  };

  return (
    <html>
      <body>
        <form
          ref={httpFormRef}
          id="modelForm"
          method="post"
          action="https://prtest.paymentsradius.com/PaymentsRadiusDI/v2/checkOut.do"
        >
          <input
            type="hidden"
            name="CLIENT_SYSTEM_ID"
            value="abc_manufacturing"
          />

          <input type="hidden" name="PROCESSOR" value="firstdata" />
          <input type="hidden" name="MERCHANT_ID" value="aj1205-05" />
          <input
            type="hidden"
            name="CLIENT_SYSTEM_ID"
            value="abc_manufacturing"
          />

          <input type="hidden" name="DI_ACCESS_TOKEN" value={accessToken} />
          <input type="hidden" name="TRANSACTION_TYPE" value="TOKENIZE" />
          <input type="hidden" name="MERCHANT_ID" value="aj1205-05" />
          <input type="hidden" name="CARD_TYPE" value="" />
          <input type="hidden" name="CALLING_APP" value="Ecommerce" />
          <input type="hidden" name="REQUEST_ID" value="11445566" />
          <input type="hidden" name="REFERENCE_NUMBER" value="11445566" />
          <input type="hidden" name="DATA_LEVEL" value="1" />
          <input
            type="hidden"
            name="POST_BACK_URL"
            value="https://glacial-cliffs-78227-e5b87b59c5df.herokuapp.com/di-post"
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
          <input type="hidden" name="PROCESSOR" Value="firstdata" />
        </form>
      </body>

      <div>
        <h1>Welcome to the Sandbox</h1>
        <p>Press the 'Get Access Token' button to generate an access token</p>
        {displayIFrameButton && (
          <p>Then press the Display iFrame button to render the HRC iFrame</p>
        )}
        <button
          onClick={() => {
            getAccess();
          }}
        >
          {' '}
          Get Access Token{' '}
        </button>

        {displayHTMLButton && <button onClick={handleSubmit}>HTML Demo</button>}
        {displayIFrameButton && (
          <button onClick={handleDisplayIFrameButton}>iFrame Demo</button>
        )}

        {eventData && (
          <div>
            <h2>Event Data:</h2>
            <p>
              <b>Key:</b> {eventData.key}
              <br />
              <b>Token:</b> {eventData.payload.cardToken}
              <br />
              <b>TransId:</b> {eventData.payload.transactionId}
            </p>
            <p>
              <b>Payload:</b> {JSON.stringify(eventData.payload)}
            </p>
          </div>
        )}

        <iframe
          ref={hiddenIframeRef}
          id="hiddenIframe"
          name="hiddenIframe"
          style={{ display: styleDisplay, width: '800px', height: '600px' }}
          title="Hidden Iframe"
        />
      </div>
    </html>
  );
}
