#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CodepipeLineStack } from '../lib/codepipeline-stack';

const app = new cdk.App();
new CodepipeLineStack(app, 'CodepipeLineStack', {
  env: { account: '554815294851', region: 'us-east-1' },
});