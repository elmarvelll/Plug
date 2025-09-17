import type{ URLSearchParamsInit } from "react-router-dom";


function PageNavigation(searchParams:URLSearchParams, setsearchParams:((prev: URLSearchParams) => URLSearchParamsInit)) {

    function changePage(str: string) {
        const params = new URLSearchParams(searchParams)
        params.set('page', str)
        setsearchParams(params)
    }
    function slideBackwards() {
        const pagenum = Number(searchParams.get('page'))
        if (!(pagenum - 1 < 1)) {
            const params = new URLSearchParams(searchParams)
            params.set('page', (pagenum - 1).toString())
            setsearchParams(params)
        }
    }

    function slideforward() {
        const pagenum = Number(searchParams.get('page'))
        if (!(pagenum + 1 > 3)) {
            const params = new URLSearchParams(searchParams)
            params.set('page', (pagenum + 1).toString())
            setsearchParams(params)
        }
    }
    return { slideBackwards, slideforward, changePage}
}
export default PageNavigation