// @vitest-environment happy-dom

import { describe, it, expect, vi, beforeEach } from "vitest";
import xAlert from "./xalert";

beforeEach(async () => {
    document.body.innerHTML = ''
})

describe('xalert', () => {
    it('supports empty config', () => {
        expect(xAlert).toBeTypeOf('function')
        expect(xAlert()).toBeInstanceOf(Promise)
        const xAlertContainer = document.querySelector('#xalert-container')
        expect(xAlertContainer.children.length).toBe(2)
        const xAlertTemplate = xAlertContainer.querySelector('#xalert-template')
        expect(xAlertTemplate.innerHTML).toContain('<dialog')
        const xAlertDialogs = xAlertContainer.querySelectorAll('.xalert')
        expect(xAlertDialogs.length).toBe(1)
    })

    it('supports a configuration', () => {
        xAlert({
            title: 'testTitle',
            icon: 'testIcon',
            text: 'test Text',
            className: 'testClassName',
            buttons: [
                {
                    text: 'test button text',
                    className: 'testButtonClass',
                    focus: true,
                    value: 'testValue'
                }
            ]
        })
        const dialog = document.querySelector('.xalert')
        // the dialog is open
        expect(dialog.hasAttribute('open')).toBe(true)
        // the title is set
        expect(dialog.querySelector('.xalert__title').textContent).toBe('testTitle')
        // the icon iset
        expect(dialog.querySelector('.xalert__icon').innerHTML).not.toBe('')
        // the button is set
        const buttonsWrapper = dialog.querySelector('.xalert__buttons') 
        expect(buttonsWrapper.querySelectorAll('button').length).toBe(1)
        expect(buttonsWrapper.querySelector('button').textContent).toBe('test button text')
    })

    it('can be closed', async () => {
        const alert = xAlert({
            buttons: [
                { 
                    value: 'test button value', 
                text: 'test button text'
             }
            ]
        })

        const dialog = document.querySelector('.xalert')
        dialog.querySelector('button').click()
        expect(alert).resolves.toBe('test button value')
    })
})