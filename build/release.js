const argv = require('yargs').argv
const chalk = require('chalk')
const inquirer = require('inquirer')
const Prompt = inquirer.prompt
const exec = require('shelljs').exec
const path = require('path')
const pkg = require('../package.json')
const ora = require('ora')
const fs = require('fs')


function log(msg, label) {
	console.log(label, msg)
}

function success(msg) {
	log(msg, chalk.green('success'))
}

function error(msg) {
	log(msg, chalk.red('error'))
}

function warn(msg) {
	log(msg, chalk.yellow('warn'))
}

function info(msg) {
	log(msg, chalk.cyan('info'))
}

function exit1() {
	process.exit(1)
}

function exit0() {
	process.exit(0)
}

function newVersion(oldVersion) {

	if (!/^\d\.\d\.\d$/.test(oldVersion)) {
		throw new Error('Invalid version')
	}

	function parseVersion() {
		return oldVersion.split('.').map(str => parseInt(str))
	}

	const serializedVersion = parseVersion(oldVersion)
	let L, M, S

	L = serializedVersion[0]
	M = serializedVersion[1]
	S = serializedVersion[2]

	const S_Version = [L, M, ++S].join('.')
	const M_Version = [L, ++M, 0].join('.')
	const L_Version = [++L, 0, 0].join('.')

	return {
		S_Version,
		M_Version,
		L_Version,
		LIST: [S_Version,
			M_Version,
			L_Version]
	}
}

const NEXT_VERSION = newVersion(pkg.version).LIST

function answerCheck(answer) {
	if (!answer) {

	}
}

const PROMPTS = {
	confirmVersion(version) {
		return {
			type: 'confirm',
			name: 'isReady',
			message: `Current version: ${pkg.version}, Please confirm if all ready to release ?`,
		}
	},
	releaseVersion(versions) {
		return {
			type: 'list',
			name: 'releaseVersion',
			message: 'Choose a release version',
			choices: versions
		}
	}
}

function changePkgVersion(pkgPath, newVersion) {
	let pkgjson = require(pkgPath)
	pkgjson.version = newVersion
	fs.writeFileSync(pkgPath, JSON.stringify(pkgjson, null, 2))
}

function release() {

	Prompt([PROMPTS.confirmVersion(pkg.version)])
		.then(answers => {
			if (answers.isReady) {
				return Prompt([PROMPTS.releaseVersion(NEXT_VERSION)])
			} else {
				info('Canceled release')
				exit0()
			}
		})
		.then(answers => {
			const releaseVersion = answers.releaseVersion
			const spinner = ora(`Start to release "${pkg.name} ${releaseVersion}"`).start();

			spinner.info('Update version in package.json ...')
			changePkgVersion(path.resolve(process.cwd(), 'package.json'), releaseVersion)

			spinner.info('Create a release commit ...')
			exec(`git commit -am "[Release] v${releaseVersion}"`)

			spinner.info('Creating release tag ....')
			exec(`git tag -a v${releaseVersion} -m "${pkg.name} Version v${releaseVersion}"`)

			spinner.info('Releasing ...')
			exec(`git push`, (code, stdout, stderr) => {
				if (code === 0) {
					spinner.succeed('Released to Github successfully')
					spinner.info('Release to NPM ....')
					exec('npm publish')
				} else {
					spinner.fail('Failed to released to Github, Please see above error message.')
				}
			})
		})

	// exec('git push origin v1.0.4')
}

release()



