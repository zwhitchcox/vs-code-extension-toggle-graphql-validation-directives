// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { parse, Location } from 'graphql'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const selector:vscode.DocumentSelector = {
		scheme: 'file',
		language: 'graphql'
	}
	const provider: vscode.FoldingRangeProvider = {
		provideFoldingRanges(document: vscode.TextDocument): vscode.FoldingRange[] {
			const text = document.getText()
			const ln = getValidationLineNumbers(text)
			return ln.map(([start, end]) => {
				return new vscode.FoldingRange(start - 2, end, 3)
			})
		}
	}

	vscode.languages.registerFoldingRangeProvider(
		selector,
		provider,
	)
}

export function getValidationLineNumbers(text: string) {
	const parsed = parse(text)
	return parsed.definitions.reduce((result: [number, number][], definition) => {
		if (definition.kind === "ObjectTypeDefinition") {
			if (!definition.fields) return result
			definition.fields.forEach(fieldDefinition => {
				if (!fieldDefinition.directives) return
				fieldDefinition.directives.forEach(directive => {
					if (!(directive && directive.loc)) return
					if (directive.name.value === "validation") {
						const startLine = text.substring(0, directive.loc.start).split('\n').length
						const endLine = text.substring(0, directive.loc.end).split('\n').length
						result.push([startLine, endLine])
					}
				})
			})
		}
		return result
	}, [])
}

// this method is called when your extension is deactivated
export function deactivate() {}
