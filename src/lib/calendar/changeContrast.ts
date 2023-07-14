import { browser } from '$app/environment'

export function changeContrast(preferences: any) {
	if (browser) {
		let stylesheet = document.styleSheets[1]
		if (preferences.contrastView) {
			stylesheet.insertRule(
				'.ec-header { border: 3px solid #4f4f4f !important; background-color: #cccecf }',
				0
			)
			stylesheet.insertRule(
				'.ec-body { border: 2px solid #4f4f4f !important; border-top: 0px !important; }',
				1
			)
			stylesheet.insertRule(
				'.ec-day { border: 1px solid #4f4f4f !important; font-size: 22px !important; }',
				2
			)
			stylesheet.insertRule('.ec-days { border-bottom: 1px solid #4f4f4f !important; }', 3)
			stylesheet.insertRule('.ec-header > .ec-days { border: 0px !important; }', 4)
			stylesheet.insertRule('.ec-title {font-size: 22px !important; }', 4)
		} else {
			stylesheet.insertRule('.ec-header { border: 1px solid #dadce0 !important; }', 0)
		}
	}
}
