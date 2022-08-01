import React, { useContext, useState, } from 'react'
import { Context } from '../../index'
import Logo from '../../assets/Logo.svg'
import { Button, Input, message, } from 'antd'
import './PaymentCheck.css'

const PaymentCheck = () => {

    const {user} = useContext(Context)
    const date = new Date()
    const [sum, setSum] = useState()
    const [visible, setVisible] = useState('none')
    const [visiblePay, setVisiblePay] = useState('block')

    
  return (
      
    <div className="container">
        
        <div style={{ display: `${visible}` }}>
           
        
        <div id='paymentForm' >
        <div style={{width: '400px', margin: '0 auto', marginTop: '80px'}}>
            <div className="logo" style={{textAlign: 'center', marginBottom: '15px'}}>
            <img src={Logo} alt="logo"/>
            <p>Квитанция</p>
            </div>
            <hr/>
            <div style={{display: 'flex', justifyContent: 'space-between'}} >
                <div>
                    <p>Дата</p>
                    <p>Логин пользователя</p>
                    <p>Сумма</p>
                </div>
                <div>
                    <p>{`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}</p>
                    <p>{user.user.login}</p>
                    <p>{sum} руб.</p>
                </div>
            </div>
            <hr/>
            <div className="payment__info2">
                {/* <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <p>Наименование услуги</p>
                    <p>Цена</p>
                    <p>Количество</p>
                    <p>Сумма</p>
                </div> */}
                <p>Оказание материальной помощи</p>
                {/* <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <p>Оказание материальной помощи</p>
                    <p>{sum} руб</p>
                    <p>1 шт</p>
                    <p>{sum} руб</p>
                </div> */}
                <hr/>
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '24px'}}>
                    <p>ИТОГ</p>
                    <p>{sum} руб</p>
                </div>
            </div>
        </div>
        </div>
            <Button onClick={
                () => {
                    
                    var printText = document.getElementById('paymentForm').innerHTML;
                    var windowPrint = window.open('','','left=50,top=50,width=800,height=740,toolbar=0,scrollbars=1,status=0');
                    windowPrint.document.write(printText);
                    windowPrint.document.close();
                    windowPrint.focus();
                    windowPrint.print();
                    windowPrint.close();
                }
            }
            >
                Печать
            </Button>
        </div>
        
            <div style={{display: `${visiblePay}`, marginTop:"20px", textAlign:"center"}}>
                <Input style={{width: '200px'}} placeholder="Введите сумму" value={sum} onChange={ e => setSum(e.target.value)}/>
                <Button onClick={
                    () => {
                        if(!sum){
                            message.error('Введите сумму')
                        } else {
                            setVisible('block')
                            setVisiblePay('none')
                        }
                    }
                }
                >
                    Оплатить
                </Button>
            </div>
    </div>
  )
}

export default PaymentCheck