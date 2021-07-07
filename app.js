window.addEventListener('load', async () => {
  if (navigator.serviceWorker) {

    try{
      const reg = await navigator.serviceWorker.register('../sw.js')
      console.log('service worker register success', reg)
    } catch(e) {
      console.log('service worker not working')
    }
  }

  main()
})



async function main () {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=15')
    const data = await res.json()
    
    const resultFetch = data.map(r => {
      return `
      <li>${r.body}</li>
      `
    }).join('\n')
   
    document.querySelector('#main').innerHTML = resultFetch
}