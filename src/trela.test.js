// @vitest-environment happy-dom

import { describe, it, expect, beforeEach } from "vitest";
import trela from "./trela";

beforeEach(async () => {
	document.body.innerHTML = ''
})

describe('trela', () => {
	it('supports empty config', () => {
		expect(trela).toBeTypeOf('function')
		expect(trela()).toBeInstanceOf(Promise)
		const trelaContainer = document.querySelector('#trela-container')
		expect(trelaContainer.children.length).toBe(2)
		const trelaTemplate = trelaContainer.querySelector('#trela-template')
		expect(trelaTemplate.innerHTML).toContain('<dialog')
		const trelaDialogs = trelaContainer.querySelectorAll('.trela')
		expect(trelaDialogs.length).toBe(1)
		expect(trelaDialogs[0].hasAttribute('open')).toBe(true)
	})

	it('supports a configuration', () => {
		trela({
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
		const dialog = document.querySelector('.trela')
		// the dialog is open
		expect(dialog.hasAttribute('open')).toBe(true)
		// the title is set
		expect(dialog.querySelector('.trela__title').textContent).toBe('testTitle')
		// the icon iset
		expect(dialog.querySelector('.trela__icon').innerHTML).not.toBe('')
		// the button is set
		const buttonsWrapper = dialog.querySelector('.trela__buttons')
		expect(buttonsWrapper.querySelectorAll('button').length).toBe(1)
		expect(buttonsWrapper.querySelector('button').textContent).toBe('test button text')
	})

	it('can be closed', async () => {
		const alert = trela({
			buttons: [
				{
					value: 'test button value',
					text: 'test button text'
				}
			]
		})

		const dialog = document.querySelector('.trela')
		dialog.querySelector('button').click()
		expect(alert).resolves.toBe('test button value')
	})
})
