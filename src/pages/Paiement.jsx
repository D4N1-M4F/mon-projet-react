import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Form, Input, Select, Button, Typography, List, Row, Col, Spin, Steps, Divider, Radio, message } from 'antd';
import { UserOutlined, EnvironmentOutlined, PhoneOutlined, CreditCardOutlined, PayCircleOutlined } from '@ant-design/icons';
 
const { Step } = Steps;
const { Option } = Select;
const { Title, Text } = Typography;
 
const Paiement = () => {
    const location = useLocation();
    const { items = [] } = location.state || {};
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('credit-card');
    const [form] = Form.useForm();
 
    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then((response) => response.json())
            .then((data) => {
                const sortedCountries = data
                    .filter(country => country.name?.common)
                    .sort((a, b) => a.name.common.localeCompare(b.name.common));
                setCountries(sortedCountries);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des pays:', error);
                setLoading(false);
            });
    }, []);
 
    const onFinish = async (values) => {
        const fullPhone = `${values.dialCode} ${values.phoneNumber}`;
        console.log('Données soumises:', { ...values, phone: fullPhone });
       
        setLoading(true);
        message.loading('Traitement du paiement...', 2.5);
       
        setTimeout(() => {
            setLoading(false);
            message.success('Paiement réussi !');
        }, 2500);
    };
 
    const nextStep = () => {
        form.validateFields()
            .then(() => setCurrentStep(currentStep + 1))
            .catch((errorInfo) => {
                console.log('Erreur de validation:', errorInfo.errorFields);
            });
    };
 
    const prevStep = () => setCurrentStep(currentStep - 1);
 
    const getUniqueDialCodes = () => {
        const dialCodes = new Set();
        return countries
            .flatMap(country =>
                country.idd?.root && country.idd?.suffixes
                    ? country.idd.suffixes.map(suffix => ({
                        dialCode: country.idd.root + suffix
                    }))
                    : []
            )
            .filter(country => country.dialCode && !dialCodes.has(country.dialCode) && dialCodes.add(country.dialCode))
            .sort((a, b) => parseInt(a.dialCode) - parseInt(b.dialCode));
    };
 
    const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);
 
    const steps = [
        {
            title: 'Informations personnelles',
            icon: <UserOutlined />,
            content: (
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Nom"
                            name="lastName"
                            rules={[
                                { required: true, message: 'Veuillez entrer votre nom' },
                                { pattern: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, message: 'Nom invalide' }
                            ]}
                        >
                            <Input placeholder="Entrez votre nom" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Prénom"
                            name="firstName"
                            rules={[
                                { required: true, message: 'Veuillez entrer votre prénom' },
                                { pattern: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, message: 'Prénom invalide' }
                            ]}
                        >
                            <Input placeholder="Entrez votre prénom" />
                        </Form.Item>
                    </Col>
                </Row>
            ),
        },
        {
            title: 'Adresse',
            icon: <EnvironmentOutlined />,
            content: (
                <>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Pays"
                                name="country"
                                rules={[{ required: true, message: 'Sélectionnez votre pays' }]}
                            >
                                <Select
                                    placeholder="Sélectionnez votre pays"
                                    showSearch
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().includes(input.toLowerCase())
                                    }
                                >
                                    {countries.map((country) => (
                                        <Option key={country.cca2} value={country.cca2}>
                                            {country.name.common}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Ville"
                                name="city"
                                rules={[
                                    { required: true, message: 'Veuillez entrer votre ville' },
                                    { pattern: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, message: 'Nom de ville invalide' }
                                ]}
                            >
                                <Input placeholder="Entrez votre ville" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        label="Adresse"
                        name="address"
                        rules={[
                            { required: true, message: 'Veuillez entrer votre adresse' },
                            { pattern: /^[A-Za-z0-9À-ÖØ-öø-ÿ\s,'-]+$/, message: 'Adresse invalide' }
                        ]}
                    >
                        <Input placeholder="Entrez votre adresse complète" />
                    </Form.Item>
                </>
            ),
        },
        {
            title: 'Contact',
            icon: <PhoneOutlined />,
            content: (
                <Form.Item label="Numéro de téléphone" required>
                    <Input.Group compact>
                        <Form.Item
                            name="dialCode"
                            noStyle
                            rules={[{ required: true, message: 'Indicatif requis' }]}
                        >
                            <Select
                                style={{ width: '30%' }}
                                placeholder="+1"
                                showSearch
                                optionFilterProp="children"
                            >
                                {getUniqueDialCodes().map((d, i) => (
                                    <Option key={i} value={d.dialCode}>
                                        {d.dialCode}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="phoneNumber"
                            noStyle
                            rules={[
                                { required: true, message: 'Numéro requis' },
                                {
                                    pattern: /^[\d\s()\-+]{8,20}$/,
                                    message: 'Format invalide. Ex: (438) 456-7890'
                                }
                            ]}
                        >
                            <Input
                                style={{ width: '70%' }}
                                placeholder="(438) 456-7890"
                                allowClear
                                onChange={() => form.validateFields(['phoneNumber'])}
                            />
                        </Form.Item>
                    </Input.Group>
                </Form.Item>
            )
        },
        {
            title: 'Paiement',
            icon: <CreditCardOutlined />,
            content: (
                <>
                    <Form.Item label="Méthode de paiement" name="paymentMethod">
                        <Radio.Group
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            style={{ width: '100%' }}
                        >
                            <Row gutter={16}>
                                {['credit-card', 'paypal', 'mobile'].map((method) => (
                                    <Col span={8} key={method}>
                                        <Radio value={method} style={{ display: 'none' }} />
                                        <Card
                                            hoverable
                                            onClick={() => setPaymentMethod(method)}
                                            style={{
                                                textAlign: 'center',
                                                borderColor: paymentMethod === method ? '#1890ff' : '#f0f0f0',
                                                backgroundColor: paymentMethod === method ? '#e6f7ff' : '#fff'
                                            }}
                                        >
                                            {method === 'credit-card' && <CreditCardOutlined style={{ fontSize: '24px', color: '#1890ff' }} />}
                                            {method === 'paypal' && <PayCircleOutlined style={{ fontSize: '24px', color: '#1890ff' }} />}
                                            {method === 'mobile' && <PhoneOutlined style={{ fontSize: '24px', color: '#1890ff' }} />}
                                            <Text strong style={{ display: 'block', marginTop: '8px' }}>
                                                {method === 'credit-card' && 'Carte Bancaire'}
                                                {method === 'paypal' && 'PayPal'}
                                                {method === 'mobile' && 'Mobile Money'}
                                            </Text>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Radio.Group>
                    </Form.Item>
 
                    {paymentMethod === 'mobile' && (
                        <Form.Item
                            label="Opérateur mobile"
                            name="mobileOperator"
                            rules={[{ required: true, message: 'Sélectionnez un opérateur' }]}
                        >
                            <Select placeholder="Sélectionnez un opérateur">
                                {['Moov Money', 'Airtel Money', 'Orange Money', 'MTN Mobile Money'].map((operator) => (
                                    <Option key={operator} value={operator.toLowerCase().replace(' ', '-')}>
                                        {operator}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    )}
 
                    {paymentMethod === 'credit-card' && (
                        <>
                            <Form.Item
                                label="Nom du titulaire"
                                name="cardHolderName"
                                rules={[
                                    { required: true, message: 'Nom requis' },
                                    { pattern: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, message: 'Nom invalide' }
                                ]}
                            >
                                <Input placeholder="Nom tel qu'affiché sur la carte" />
                            </Form.Item>
                            <Form.Item
                                label="Numéro de carte"
                                name="cardNumber"
                                rules={[
                                    { required: true, message: 'Numéro requis' },
                                    { pattern: /^\d{16}$/, message: '16 chiffres requis' }
                                ]}
                            >
                                <Input placeholder="1234 5678 9012 3456" maxLength={16} />
                            </Form.Item>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Expiration"
                                        name="expiryDate"
                                        rules={[
                                            { required: true, message: 'Date requise' },
                                            { pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/, message: 'MM/AA requis' }
                                        ]}
                                    >
                                        <Input placeholder="MM/AA" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="CVV"
                                        name="cvv"
                                        rules={[
                                            { required: true, message: 'CVV requis' },
                                            { pattern: /^\d{3,4}$/, message: '3 ou 4 chiffres' }
                                        ]}
                                    >
                                        <Input placeholder="123" maxLength={4} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    )}
                </>
            ),
        },
    ];
 
    if (loading) {
        return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: '20%' }} />;
    }
 
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
            padding: '20px'
        }}>
            <Card
                title="Paiement en ligne"
                style={{
                    width: '90%',
                    maxWidth: '800px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    background: 'white'
                }}
            >
                <Steps current={currentStep} style={{ marginBottom: '20px' }}>
                    {steps.map((step, index) => (
                        <Step key={index} title={step.title} icon={step.icon} />
                    ))}
                </Steps>
 
                <Form layout="vertical" onFinish={onFinish} form={form}>
                    {steps[currentStep].content}
 
                    <Divider style={{ margin: '24px 0' }} />
 
                    <Row justify="space-between">
                        <Col>
                            {currentStep > 0 && (
                                <Button
                                    onClick={prevStep}
                                    style={{
                                        borderRadius: '8px',
                                        padding: '0 24px',
                                        height: '40px'
                                    }}
                                >
                                    Précédent
                                </Button>
                            )}
                        </Col>
                        <Col>
                            {currentStep < steps.length - 1 ? (
                                <Button
                                    type="primary"
                                    onClick={nextStep}
                                    style={{
                                        borderRadius: '8px',
                                        padding: '0 24px',
                                        height: '40px'
                                    }}
                                >
                                    Suivant
                                </Button>
                            ) : (
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                        borderRadius: '8px',
                                        padding: '0 24px',
                                        height: '40px',
                                        background: '#52c41a',
                                        borderColor: '#52c41a'
                                    }}
                                >
                                    Payer maintenant ({totalAmount}$)
                                </Button>
                            )}
                        </Col>
                    </Row>
                </Form>
 
                <Divider style={{ margin: '24px 0' }} />
 
                <Title level={5} style={{ color: '#1890ff' }}>Résumé de la commande</Title>
                <List
                    dataSource={items}
                    renderItem={(item) => (
                        <List.Item
                            style={{
                                padding: '12px',
                                borderRadius: '8px',
                                marginBottom: '8px',
                                background: '#fafafa'
                            }}
                        >
                            <List.Item.Meta
                                title={<Text strong>{item.name}</Text>}
                                description={`Quantité: ${item.quantity} | Prix: ${item.price}$`}
                            />
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    );
};
 
export default Paiement;