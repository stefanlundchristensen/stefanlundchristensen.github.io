const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const E='https://script.google.com/macros/s/AKfycbTESTtestTESTtestTEST/exec';
const source=fs.readFileSync(__dirname+'/../public/wedding/assets/site.js','utf8');
function mount(config,fetcher){
 const listeners={};const status={textContent:'',focus(){this.focused=true}};
 const submit={disabled:false,textContent:'',innerHTML:''};
 const count={required:false,disabled:false};const diet={disabled:false};
 const extras={hidden:true,querySelectorAll:()=>[count,diet]};
 const form={action:'',elements:{attendance:{value:''},guest_count:count},addEventListener:(type,cb)=>listeners[type]=cb,reportValidity:()=>true,querySelector:()=>submit,querySelectorAll:()=>[],classList:{add(){}},reset(){this.resetCalled=true;this.elements.attendance.value=''}};
 const fields={disabled:true};const notice={textContent:''};
 const nodes={'#rsvp-form':form,'#rsvp-fields':fields,'#form-result':status,'#form-notice':notice,'#deadline':{},'#attending-fields':extras,'#calendar':{addEventListener(){}},'#toast':{}};
 let calls=0;
 const ctx={window:{WEDDING_CONFIG:config},document:{querySelector:s=>nodes[s]},fetch:async(...args)=>{calls++;return fetcher(...args)},FormData:class{},URLSearchParams:class{},AbortController,setTimeout,clearTimeout,location:{search:''}};
 vm.runInNewContext(source,ctx);
 return {form,fields,notice,status,submit,count,diet,extras,listeners,calls:()=>calls,send:()=>listeners.submit({preventDefault(){}})};
}
(async()=>{
 const closed=mount({rsvpOpen:true,rsvpEndpoint:''},()=>{throw Error('must not send')});
 assert(closed.fields.disabled);await closed.send();assert.equal(closed.calls(),0);
 const good=mount({rsvpOpen:true,rsvpEndpoint:E},async()=>({ok:true,json:async()=>({ok:true})}));
 assert.equal(good.fields.disabled,false);assert.equal(good.form.action,E);
 good.form.elements.attendance.value='yes';good.listeners.change();assert.equal(good.extras.hidden,false);assert(good.count.required);assert.equal(good.diet.disabled,false);
 good.form.elements.attendance.value='no';good.listeners.change();assert(good.extras.hidden);assert(good.count.disabled);assert.equal(good.count.required,false);
 await good.send();assert(good.form.resetCalled);assert(good.fields.disabled);assert.match(good.status.textContent,/Tak!/);
 const bad=mount({rsvpOpen:true,rsvpEndpoint:E},async()=>({ok:false}));await bad.send();assert.equal(bad.form.resetCalled,undefined);assert.equal(bad.submit.disabled,false);assert.match(bad.status.textContent,/ikke bekræftet/);
 const scriptError=mount({rsvpOpen:true,rsvpEndpoint:E},async()=>({ok:true,json:async()=>({ok:false})}));await scriptError.send();assert.equal(scriptError.form.resetCalled,undefined);assert.match(scriptError.status.textContent,/ikke bekræftet/);
 const wrongHost=mount({rsvpOpen:true,rsvpEndpoint:'https://example.com/exec'},()=>{throw Error('must not send')});assert(wrongHost.fields.disabled);await wrongHost.send();assert.equal(wrongHost.calls(),0);
 const timeout=mount({rsvpOpen:true,rsvpEndpoint:E},async()=>{const e=Error();e.name='AbortError';throw e});await timeout.send();assert.match(timeout.status.textContent,/kan være nået frem/);
 let release;const pending=mount({rsvpOpen:true,rsvpEndpoint:E},()=>new Promise(resolve=>release=resolve));const first=pending.send();await pending.send();assert.equal(pending.calls(),1);release({ok:true,json:async()=>({ok:true})});await first;
 console.log('PASS: closed configuration, endpoint setup, conditional attendance fields, success, HTTP rejection, script-reported failure, wrong host, timeout and duplicate-submit guard. No network requests sent.');
})().catch(e=>{console.error(e);process.exitCode=1});
