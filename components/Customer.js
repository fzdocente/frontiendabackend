import { Text, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import { styles } from '../assets/styles/styles';
import { useEffect, useState } from 'react';
import axios from 'axios'

export default function Customer() {
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState('');
    const [idSearch, setIdSearch] = useState('')

    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        defaultValues: {
            nombre: '',
            apellidos: ''
        }
    });

    const onSave = async (data) => {
        //console.log(data)
        const response = await axios.post(`http://127.0.0.1:3000/api/clientes`, {
            nombre: data.nombre,
            apellidos: data.apellidos
        })
        setIsError(false);
        setMessage("Cliente agregado correctamente");
        setTimeout(() => {
            setMessage('');
            reset(); // borrar los datos del useForm
        }, 2000)
    };

    const onUpdate = async (data) => {
        const { nombre, apellidos } = data
        const response = await axios.put(`http://127.0.0.1:3000/api/clientes/${idSearch}`, {
            nombre: nombre,
            apellidos: apellidos
        })
        setIsError(false);
        setMessage("Cliente actualizado correctamente");
        setTimeout(() => {
            setMessage('');
            reset(); // borrar los datos del useForm
            setIdSearch("")
        }, 2000)
    };

    const onDelete = async (data) => {
        if (confirm(`Está seguro de eliminar el cliente ${data.nombre} ${data.apellidos}`)) {
            const response = await axios.delete(`http://127.0.0.1:3000/api/clientes/${idSearch}`);
            setIsError(false)
            setMessage("Cliente eliminado correctamente....")
            setTimeout(() => {
                setMessage('');
                reset(); // borrar los datos del useForm
                setIdSearch("")
            }, 2000)
        }
    }

    const onSearch = async () => {
        const response = await axios.get(`http://127.0.0.1:3000/api/clientes/${idSearch}`)
        if (!response.data.error) {
            const { nombre, apellidos } = response.data
            setValue("nombre", nombre);
            setValue("apellidos", apellidos)
            setIsError(false)
            setMessage("")
        }
        else {
            setIsError(true)
            setMessage("El id del cliente NO existe. Inténtelo con otro...")
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Actualización de Clientes</Text>
            <TextInput
                label="Id del cliente a buscar"
                mode="outlined"
                value={idSearch}
                onChangeText={idSearch => setIdSearch(idSearch)}
            />
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Nombre Completo"
                        mode="outlined"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="nombre"
            />
            {errors.nombre && <Text style={{ color: 'red' }}>El nombre es obligatorio</Text>}

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Apellidos"
                        mode="outlined"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="apellidos"
            />
            {errors.apellidos && <Text style={{ color: 'red' }}>Los apellidos son obligatorios</Text>}
            <Text style={{ color: isError ? 'red' : 'green' }}>{message}</Text>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Button
                    style={{ backgroundColor: 'green', marginRight: 10 }}
                    icon="account-outline"
                    mode="contained"
                    onPress={handleSubmit(onSave)}>
                    Guardar
                </Button>
                <Button
                    style={{ backgroundColor: 'orange', marginRight: 10 }}
                    icon="account-search"
                    mode="contained"
                    onPress={onSearch}>
                    Buscar
                </Button>

            </View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Button
                    style={{ backgroundColor: 'blue', marginRight: 10 }}
                    icon="pencil"
                    mode="contained"
                    onPress={handleSubmit(onUpdate)}>
                    Actualizar
                </Button>
                <Button
                    style={{ backgroundColor: 'red', marginRight: 10 }}
                    icon="delete-outline"
                    mode="contained" 
                    onPress={handleSubmit(onDelete)}>
                    Eliminar
                </Button>

            </View>
        </View>
    );
}
