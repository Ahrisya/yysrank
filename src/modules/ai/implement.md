---
title: 实现原理
categories: implement
---

参考了AlphaGo的原理，但考虑到普通计算机计算性能的原因做了很大的简化。

训练了两个神经网络RewardNet和PredictNet，RewardNet用来预测阵容的胜率，并将此作为MCTS最后用来更新节点的reward。PredictNet则是预测下一手的pick，用来做MCTS的playout以及先验概率。

为了减轻计算负担，先验概率小于阈值的分支将不予考虑。

RewardNet和PredictNet都是设计了特定结构的Dense层，以减轻计算量。（本来是考虑用RNN的，比如GRU啥的，但推理速度实在是太TM慢了，完全不适合在MCTS这种需要大规模重复试验的情况。）

对MCTS的UCB也做了一些修改，使得先验概率的影响会随着试验次数的增多而递减趋于0，这样使得MCTS在早期能尽快找到一个可以接受的结果，但不会被困住局部最优中。

目前RewardNet在测试集上的准确率可以达到61%以上，PredictNet在测试集上的准确率在35%以上，top5准确率则达到近80%，均达到可以使用的水平。（PS，dota的胜率预测模型最高准确率在63%左右）

在本人的电脑上可以在10s内进行700-800次搜索。