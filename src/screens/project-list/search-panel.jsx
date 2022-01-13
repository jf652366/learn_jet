import {useCallback, useEffect, useMemo, useState} from "react";

export  const SearchPanel = () => {
    const [param,setParam]=useState({
        name:'',
        personID:''
    })
    const [users,setIsers]=useState([]);
    const [list,setList]=useState([])
    useEffect(()=>{
        fetch('').then(async response=>{
            if (response.ok){
                setList(await response.json())
            }
        })
    })
    useCallback(()=>{

    },[])
    useMemo(()=>{

    },[])

    return <form>
        <input type='text' value={param.name} onChange={evt=>setParam({
            ...param,name: evt.target.value
        })
        }/>
        <select value={param.personID} onChange={evt=>setParam({
            ...param,personID: evt.target.value
        })}>
            <option value={''}>
                负责人
            </option>
            {
                users.map(user=><option value={user.id}>{user.name}</option>)
            }
        </select>
    </form>
}