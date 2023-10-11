import React, { useEffect, useState } from "react"

const SexHook = () => {
    const [sex, setSex] = useState('')

    useEffect(() => {
        const sexPath = window.location.pathname.replace('/', '').split('/')[0]
        console.log(typeof sexPath, 'sexhook');
        console.log(sexPath.length, 'sexhookl');

        const sexValue = sexPath.length ? sexPath : 'man'

        setSex(sexValue)
    }, [])

    return sex
}

export default SexHook