import * as cdk from "aws-cdk-lib";  
import * as pipeline from "aws-cdk-lib/pipelines";  
import { ManualApprovalStep, ShellStep } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { MyPipelineAppStage } from "./stage-stack";

export class CodepipeLineStack extends cdk.Stack{
    constructor(scope: Construct, id:string, props?:cdk.StackProps){
        super(scope, id, props);

        const customPipeline = new pipeline.CodePipeline(this, 'CodePipeline', {
            pipelineName : 'TestPipeline',
            synth: new pipeline.ShellStep('Synth', {
                input : pipeline.CodePipelineSource.gitHub('amitagraibm/manualcodepipeline', 'main'),
                commands : ['npm install', 'npm run build', 'npx cdk synth']
            })
        });

        const testingStage = customPipeline.addStage(new MyPipelineAppStage(this, 'Dev', props));
        
        testingStage.addPre(new ShellStep('Running pre steps',{
            commands: ['npm install', 'npm test']
        }));
        testingStage.addPost(new ManualApprovalStep('Manual approval required'));

        const prodStage = customPipeline.addStage(new MyPipelineAppStage(this, 'Prod', props));
        


    }
}