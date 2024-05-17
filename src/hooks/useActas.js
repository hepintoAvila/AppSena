/* eslint-disable no-lone-blocks */
/* eslint-disable default-case */

import { useCallback, useState } from 'react'
import encodeBasicUrl from '../utils/encodeBasicUrl';
import { APICore } from '../helpers/api/apiCore';
const api = new APICore();

export const useActas = () => {
  const [isLoading, setLoading] = useState(false);
  const [itemsActas, setActas] = useState([]);
  //QUERY DE RESPUSTA DE CONSULTAS
  const query = useCallback((itemUrl, tipo, opcion) => {
    setLoading(true);
    setTimeout(function () {
      let varibles;
      let datos = opcion;
      if (opcion) {
        var queryString = datos[0]
          ? Object.keys(datos[0])
            .map((key) => key + '=' + datos[0][key])
            .join('&')
          : '';
        varibles = queryString;
      }
      let userInfo = sessionStorage.getItem('hyper_user');
      const user = JSON.parse(userInfo);
      if (user) {
        const url = `accion=${encodeBasicUrl(itemUrl)}&tipo=${encodeBasicUrl(tipo)}&${varibles}&entidad=${encodeBasicUrl(user[0]?.entidad)}&idUsuario=${encodeBasicUrl(user[0]?.id)}`;
        const datosResq = api.sendRequestData(`${url}`);
        datosResq?.then(function (response) {
          try {
            {
              (() => {
                switch (datos[0]?.obj) {
                  case 'actas':
                    setActas(response)
                    break;

                }
              })()
            }
          } catch (error) {
            console.error(error);
          }
        })
          .catch((error) => console.error('Error:', error))
          .finally(() => {
            setTimeout(function () {
              setLoading(false);
            }, 1000);
          });
      }
    }, 2000);
  }, []);
  return (
    {
      query,
      isLoading,
      itemsActas,
    }
  )
}
