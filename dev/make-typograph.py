anylang = ['symbols', 'exclamations', 'cubes', 'dash', 'quotes', 'english-quotes', 'quote-dot', 'rouble', 'double-symbols', 'punctuation-mark-space', 'recovery-links', 'recovery-numbers', 'recovery-newline-space-remove', 'units', 'number-separation', 'non-braking-spaces']
russian = ['ru-phones', 'ru-phone-commas']
spanish = ['sp-smth']
finnish = ['fi-smth']

basename = 'typograph'
versions = ['russian', 'spanish', 'finnish']


for lang in versions:

	modules =  eval(lang) + anylang
	filename = basename + '-' + lang + '.js'

	with open(filename, 'w') as jsfile:
		for x in modules:
			jsfile.write('\n' + open('modules/' + x + '.js', 'r').read() + '\n')

	with open(filename, 'r+') as jsfile:
		lines = jsfile.readlines()
		jsfile.seek(0)
		jsfile.writelines( ["var typographme = function (text) {\n"]+lines )

	with open(filename, 'a') as jsfile:
		jsfile.write('\n	return text;\n}')