import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Product from '../e-commerce/product/Product';
import Architect from '../../pages/arrchitect/architect';

const QontoConnector = withStyles({
	alternativeLabel: {
		top: 5,
		left: 'calc(-50% + 16px)',
		right: 'calc(50% + 16px)'
	},
	active: {
		'& $line': {
			borderColor: '#784af4'
		}
	},
	completed: {
		'& $line': {
			borderColor: '#784af4'
		}
	},
	line: {
		borderColor: '#eaeaf0',
		borderTopWidth: 3,
		borderRadius: 1
	}
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
	root: {
		color: '#eaeaf0',
		display: 'flex',
		height: 22,
		alignItems: 'center',
		padding: '10px !important'
	},
	active: {
		color: '#784af4'
	},
	circle: {
		width: 8,
		height: 8,
		borderRadius: '50%',
		backgroundColor: 'currentColor'
	},
	completed: {
		color: '#784af4',
		zIndex: 1,
		fontSize: 18
	}
});

function QontoStepIcon(props) {
	const classes = useQontoStepIconStyles();
	const { active, completed } = props;

	return (
		<div
			className={clsx(classes.root, {
				[classes.active]: active
			})}
		>
			{completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
		</div>
	);
}

QontoStepIcon.propTypes = {
	/**
	 * Whether this step is active.
	 */
	active: PropTypes.bool,
	/**
	 * Mark the step as completed. Is passed to child components.
	 */
	completed: PropTypes.bool
};

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%'
	},
	button: {
		marginRight: theme.spacing(1)
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	}
}));

function getSteps() {
	return ['Step1', 'Step2', 'Step3', 'Step4', 'Step5'];
}

function getStepContent(step) {
	switch (step) {
		case 0:
			return 'step 1 here';
		case 1:
			return 'What is an ad group anyways?';
		case 2:
			return 'step 3 here';
		case 3:
			return 'step 4 here';
		case 4:
			return 'step 5 here';
		default:
			return 'Unknown step';
	}
}

export default function ProjectSteppers() {
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const steps = getSteps();

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<div className={classes.root}>
			<Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
				{steps.map(label => (
					<Step key={label}>
						<StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<div>
				{activeStep === steps.length ? (
					<div>
						<Typography className={classes.instructions}>
							All steps completed - you&apos;re finished
						</Typography>
						<Button onClick={handleReset} className={classes.button}>
							Reset
						</Button>
					</div>
				) : (
					<div>
						<Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
						<div>
							<Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
								Back
							</Button>
							<Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
								{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
