import { View, Text } from 'react-native'
import { styles } from '../assets/styles/styles'
import axios from 'axios';
import {useState, useEffect} from 'react'

export default function ListCustomers() {
    // Crear vble tipo array para almacenar los documentos de la colección clientes
    const [lUsers, setLUsers] = useState([]);
    const getAllUsers = async() =>{
        const dataUsers = await axios.get(`http://127.0.0.1:3000/api/clientes`);
        setLUsers( dataUsers.data)
    }

    useEffect(() => {
        getAllUsers()
    }, [lUsers])

    return (
            <View style={styles.container}> 
                <Text style={{marginBottom:20, fontSize:26,fontWeight:'bold', color:'red'}}>Listado de Clientes</Text>
                {
                    //lUsers.map(cl => (<Text>{cl.nombre} {cl.apellidos}</Text>))
                    lUsers.map(cli => {
                        return(
                            <View>
                                <Text 
                                    style={{backgroundColor:'orange', borderRadius:10, marginBottom:10,height:30,width:300,textAlign:'center',justifyContent:'center',padding:5}}>
                                    {cli.nombre} {cli.apellidos}
                                </Text>
                            </View>
                        );
                    })
                }
            </View>
        )
}