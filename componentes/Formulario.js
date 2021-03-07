import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

//componente formulario
const Formulario = () => {
    const [fecha, guardarFecha] = useState('');
    const [hora, guardarHora] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const confirmarFecha = (date) => {
        const opciones = { year: 'numeric', month: 'long', day: '2-digit'};
        guardarFecha(date.toLocaleDateString('es-ES', opciones));
        alert(date.toLocaleDateString('es-ES', opciones));
        hideDatePicker();
    };

    // muestra o oculta el time picker

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const confirmarHora = (date) => {
        alert(date)
        hideTimePicker();
    };

    return (
        <>
            <View style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Paciente:</Text>
                    <TextInput
                        style={styles.imput}
                        onChangeText={(v) => console.log(v)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Dueño:</Text>
                    <TextInput
                        style={styles.imput}
                        onChangeText={(v) => console.log(v)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Telefono Contacto:</Text>
                    <TextInput
                        style={styles.imput}
                        onChangeText={(v) => console.log(v)}
                        keyboardType="numeric"
                    />
                </View>
                <View>
                    <Text style={styles.label}>Fecha:</Text>
                    <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={confirmarFecha}
                        onCancel={hideDatePicker}
                        locale="es_ES"
                    />
                    <Text>{fecha}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Hora:</Text>
                    <Button title="Seleccionar Hora" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={confirmarHora}
                        onCancel={hideTimePicker}
                        locale="es_ES"
                        is24Hour
                    />
                    <Text>{hora}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Sintomas:</Text>
                    <TextInput
                        style={styles.imput}
                        multiline
                        onChangeText={(v) => console.log(v)}
                    />
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    formulario: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: '2.5%',
    },

    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20,
    },
    imput: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid',
    },
});

export default Formulario;
