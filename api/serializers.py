from .models import Assignment, Question
from rest_framework import serializers


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class QuestionsSerializer(serializers.ModelSerializer):
    choices = StringSerializer(many=True)
    teacher = StringSerializer(many=False)

    class Meta:
        model = Question
        fields = ('__all__')


class AssignmentSerializer(serializers.ModelSerializer):
    questions = serializers.SerializerMethodField()

    class Meta:
        model = Assignment
        fields = ('__all__')

    def get_questions(self, obj):
        questions = QuestionsSerializer(obj.questions.all(), many=True).data
        return questions
