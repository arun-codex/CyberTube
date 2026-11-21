'use client';

import { useEffect, useState } from 'react';
import type { PublicChaiConfig } from './server-config';

export type SupportConfigState =
  | { status: 'loading'; config: null }
  | { status: 'error'; config: null }
  | { status: 'ready'; config: PublicChaiConfig };

/** One browser read per mount; never optimistically assume payment is enabled. */
export function usePublicChaiConfig():SupportConfigState {
  const [state,setState]=useState<SupportConfigState>({status:'loading',config:null});
  useEffect(()=>{
    const controller = new AbortController();
    fetch('/api/support/config',{credentials:'same-origin',cache:'no-store',signal:controller.signal})
      .then(async response=>{
        if(!response.ok)throw Error('Payment configuration unavailable.');
        const config:PublicChaiConfig=await response.json();
        // Fail closed if a response is malformed or missing a usable recipient.
        if(!config || typeof config!=='object' ||
           typeof config.livePaymentsEnabled!=='boolean')throw Error('Invalid configuration.');
        if(config.livePaymentsEnabled &&
           (!config.upiId || !config.paymentPayeeName || config.mode!=='live')){
          throw Error('Incomplete payment configuration.');
        }
        return config;
      })
      .then(config=>{if(!controller.signal.aborted)setState({status:'ready',config});})
      .catch(()=>{if(!controller.signal.aborted)setState({status:'error',config:null});});
    return ()=>controller.abort();
  },[]);
  return state;
}
