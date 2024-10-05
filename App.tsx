import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
//formate vaildater
import * as Yup from 'yup';
import { Formik } from 'formik';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number().min(4, 'password is min 4 character').max(20, 'password is max 20 character').required("Password Length is required")
})

export default function App() {
  const [password, setPassword] = useState('')
  const [isPassword, setIsPassword] = useState(false)
  const [loweCase, setLowerCase] = useState(true)
  const [upperCase, setUpperCase] = useState(false)
  const [number, setNumber] = useState(false)
  const [specialChar, setSpecialChar] = useState(false)

  const generatePasswordString = (passwordLength: number) => {
    let characterList = ''
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lower = 'abcdefghijklmnopqrstuvwxyz'
    const numberChar = '1234567890'
    const special = '!@#$%^&*(){}[]?'

    if (upperCase) {
      characterList += upper
    }
    if (loweCase) {
      characterList += lower
    }
    if (number) {
      characterList += numberChar
    }
    if (specialChar) {
      characterList += special
    }

    const passwordResult = createPassword(characterList, passwordLength)
    if (passwordResult) {
      setPassword(passwordResult)
      setIsPassword(true)
    }
  }
  const createPassword = (character: string, passwordLength: number) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * character.length)
      result += character.charAt(characterIndex)
    }
    return result;
  }
  const resetPassword = () => {
    setPassword('')
    setIsPassword(false)
    setLowerCase(true)
    setUpperCase(false)
    setNumber(false)
    setSpecialChar(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generater</Text>
          <Formik
            initialValues={{ passwordLength: "" }}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              console.log(values);

              generatePasswordString(+values.passwordLength) // here +sign convert the string into the number.
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              isSubmitting,
              handleReset,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}

                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Ex. 8"
                    keyboardType='numeric'
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include lowercase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={loweCase}
                    onPress={() => setLowerCase(!loweCase)}
                    fillColor="#29AB87"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Uppercase letters</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={() => setUpperCase(!upperCase)}
                    fillColor="#FED85D"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={number}
                    onPress={() => setNumber(!number)}
                    fillColor="#C9A0DC"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={specialChar}
                    onPress={() => setSpecialChar(!specialChar)}
                    fillColor="#FC80A5"
                  />
                </View>
                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPassword()
                    }}
                  >
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )
            }
          </Formik >
        </View >
        {
          isPassword ? (
            <View style={[styles.card, styles.cardElevated]} >
              <Text style={styles.subTitle}>Result:</Text>
              <Text style={styles.description}>Long Press to copy</Text>
              <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
            </View>
          ) : null}
      </SafeAreaView >
    </ScrollView >

  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000'
  },
})