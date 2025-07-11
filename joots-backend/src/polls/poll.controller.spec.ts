import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from './poll.controller';
import { QuestionService } from './poll.service';
import { IcebreakerService } from '../icebreakers/icebreaker.service';
import { QuestionResponseDto } from './dto/question-response.dto';

describe('QuestionController', () => {
  let controller: QuestionController;
  let questionService: QuestionService;
  let icebreakerService: IcebreakerService;

  const mockQuestionService = {
    getQuestionGroup: jest.fn(),
    getNextRandomQuestionGroup: jest.fn(),
    saveUserAnswer: jest.fn(),
  };

  const mockIcebreakerService = {
    processIcebreakersPostResponses: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [
        {
          provide: QuestionService,
          useValue: mockQuestionService,
        },
        {
          provide: IcebreakerService,
          useValue: mockIcebreakerService,
        },
      ],
    }).compile();

    controller = module.get<QuestionController>(QuestionController);
    questionService = module.get<QuestionService>(QuestionService);
    icebreakerService = module.get<IcebreakerService>(IcebreakerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getQuestionGroup', () => {
    it('should return a question group by id', async () => {
      const mockQuestionGroup = {
        id: 'test-id',
        type: 1,
        questions: [],
        options: [],
      };
      mockQuestionService.getQuestionGroup.mockResolvedValue(mockQuestionGroup);

      const result = await controller.getQuestionGroup('test-id');
      expect(result).toEqual(mockQuestionGroup);
      expect(questionService.getQuestionGroup).toHaveBeenCalledWith('test-id');
    });
  });

  describe('getNextRandomQuestionGroup', () => {
    it('should return a random question group for two users', async () => {
      const mockQuestionGroup = {
        id: 'random-id',
        type: 1,
        questions: [],
        options: [],
      };
      mockQuestionService.getNextRandomQuestionGroup.mockResolvedValue(mockQuestionGroup);

      const result = await controller.getNextRandomQuestionGroup('user1', 'user2');
      expect(result).toEqual(mockQuestionGroup);
      expect(questionService.getNextRandomQuestionGroup).toHaveBeenCalledWith('user1', 'user2');
    });
  });

  describe('postResponseToQuestion', () => {
    it('should save a question response and process icebreaker', async () => {
      const dto: QuestionResponseDto = {
        userId: 'user1',
        questionGroupId: 'group1',
        optionId: 'option1',
        conversationId: 'conv1',
      };

      const mockSavedResponse = {
        id: 'answer1',
        ...dto,
        answeredAt: new Date(),
        updatedAt: new Date(),
        isFlagged: false,
      };

      mockQuestionService.saveUserAnswer.mockResolvedValue(mockSavedResponse);

      const result = await controller.postResponseToQuestion(dto);
      expect(result).toEqual(mockSavedResponse);
      expect(questionService.saveUserAnswer).toHaveBeenCalledWith(
        dto.userId,
        dto.questionGroupId,
        dto.optionId,
        dto.conversationId
      );
      expect(icebreakerService.processIcebreakersPostResponses).toHaveBeenCalledWith(
        dto.userId,
        dto.questionGroupId,
        dto.optionId,
        dto.conversationId
      );
    });
  });
}); 