import React from "react";
import { Form, Input, Icon, Button } from "antd";
import Hoc from "../hoc/hoc";

const FormItem = Form.Item;

let id = 0;

class QuestionForm extends React.Component {
    remove = k => {
        const { form } = this.props;
        const keys = form.getFieldValue("keys");
        if (keys.length === 1) return;
        form.setFieldsValue({
            keys: keys.filter(key => key !== k)
        });
    };

    add = () => {
        const { form } = this.props;
        const keys = form.getFieldValue("keys");
        const nextKeys = keys.concat(++id);
        form.setFieldsValue({
            keys: nextKeys
        });
    };

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator("keys", { initialValue: [] });
        const keys = getFieldValue("keys");
        const formItems = keys.map((k, index) => (
            <FormItem label={index === 0 ? "Opciones" : ""} key={k}>
                {getFieldDecorator(`questions[${this.props.id}]choices[${k}]`, {
                    validateTrigger: ["onChange", "onBlur"],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: "Ingrese una opción para la pregunta"
                        }
                    ]
                })(<Input placeholder="Opción para respuesta" />)}
                {keys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        disabled={keys.length === 1}
                        onClick={() => this.remove(k)}
                    />
                ) : null}
            </FormItem>
        ));
        return (
            <Hoc>
                <FormItem label="Pregunta: ">
                    {getFieldDecorator(`question[${this.props.id}]`, {
                        validateTrigger: ["onChange", "onBlur"],
                        rules: [
                            {
                                required: true,
                                message: "Ingrese una pregunta"
                            }
                        ]
                    })(<Input placeholder="Agrega una pregunta" />)}
                </FormItem>
                <FormItem label="Respuesta: ">
                    {getFieldDecorator(`answers[${this.props.id}]`, {
                        validateTrigger: ["onChange", "onBlur"],
                        rules: [
                            {
                                required: true,
                                message: "Ingrese una respuesta para la pregunta"
                            }
                        ]
                    })(<Input placeholder="¿Cuál es la respuesta?" />)}
                </FormItem>
                {formItems}
                <FormItem>
                    <Button type="dashed" onClick={this.add} style={{ width: "60%" }}>
                        <Icon type="plus" /> Agregar una opción de respuesta
                    </Button>
                </FormItem>
            </Hoc>
        );
    }
}

export default QuestionForm;